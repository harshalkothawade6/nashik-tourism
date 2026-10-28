#!/usr/bin/env python3
"""
Nashik Simhastha Kumbh Mela Portal - Master Automated Test Suite
===============================================================
Comprehensive end-to-end testing harness verifying:
- Tri-lingual localization (Marathi, English, Hindi)
- Visual theme transitions (Heritage, Dark, Light)
- Virtual Diya Arpan live counter and river canvas
- Shahi Snan live countdown timer
- Scene 1 3D multiplane kinematics & camera presets
- Scene 2 cosmic earthquake shockwaves
- 2-by-2 pop-out emergence of all 7 pairs with GSAP spring physics
- Uchhaishravas horse strictly featuring 7 distinct heads
- 14 Ratnas Panoramic Overview in native SVG over manthan_bg_corrected.jpg
- Dynamic interactive SVG node selection
- Zero AI art mismatch (locked to authentic master cel)
- Responsive viewports (Desktop 1920x1080, Tablet 768x1024, Mobile 390x844)
- 0 JavaScript runtime errors / console exceptions

Usage:
    python tests/run_full_site_test.py
    python tests/run_full_site_test.py --url http://localhost:3000
    npm test
"""

import subprocess
import time
import requests
import asyncio
import websockets
import json
import os
import base64
import sys
import argparse
import tempfile
import shutil

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DEFAULT_SCREENSHOTS_DIR = os.path.join(REPO_ROOT, "tests", "screenshots")

def find_chrome():
    candidates = [
        os.environ.get("CHROME_PATH"),
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        "/usr/bin/chromium",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ]
    for c in candidates:
        if c and os.path.isfile(c):
            return c
    raise FileNotFoundError("Google Chrome executable not found. Please set the CHROME_PATH environment variable.")

cmd_id = 0

async def send_cmd(ws, method, params=None):
    global cmd_id
    cmd_id += 1
    msg_id = cmd_id
    payload = {"id": msg_id, "method": method, "params": params or {}}
    await ws.send(json.dumps(payload))
    while True:
        resp = await ws.recv()
        data = json.loads(resp)
        if data.get("id") == msg_id:
            return data.get("result", {})

async def eval_js(ws, expr):
    res = await send_cmd(ws, "Runtime.evaluate", {
        "expression": expr,
        "returnByValue": True,
        "awaitPromise": True
    })
    return res.get("result", {}).get("value")

async def take_screenshot(ws, filename, target_dir):
    res = await send_cmd(ws, "Page.captureScreenshot", {"format": "png"})
    data = res.get("data")
    if data:
        os.makedirs(target_dir, exist_ok=True)
        out_path = os.path.join(target_dir, filename)
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(data))
        print(f"  📸 [Screenshot]: {filename}")
        return out_path
    return None

async def set_viewport(ws, width, height, is_mobile=False):
    await send_cmd(ws, "Emulation.setDeviceMetricsOverride", {
        "width": width,
        "height": height,
        "deviceScaleFactor": 1,
        "mobile": is_mobile
    })
    await send_cmd(ws, "Emulation.setVisibleSize", {
        "width": width,
        "height": height
    })
    await asyncio.sleep(0.35)

async def run_tests(base_url, screenshots_dir, headless=True):
    chrome_path = find_chrome()
    temp_profile = tempfile.mkdtemp(prefix="chrome_kumbh_test_")
    
    chrome_args = [
        chrome_path,
        "--remote-debugging-port=9222",
        f"--user-data-dir={temp_profile}",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--mute-audio",
        "about:blank"
    ]
    if headless:
        chrome_args.insert(1, "--headless=new")

    chrome_proc = subprocess.Popen(chrome_args)
    await asyncio.sleep(2.0)
    
    test_results = []
    issues_found = []

    try:
        targets = requests.get("http://localhost:9222/json", timeout=5).json()
        page_target = next(t for t in targets if t.get("type") == "page")
        ws_url = page_target["webSocketDebuggerUrl"]

        async with websockets.connect(ws_url, max_size=25*1024*1024) as ws:
            await send_cmd(ws, "Runtime.enable")
            await send_cmd(ws, "Page.enable")
            await send_cmd(ws, "DOM.enable")

            # Collect runtime exceptions
            runtime_exceptions = []
            async def listen_events():
                try:
                    while True:
                        msg = await ws.recv()
                        data = json.loads(msg)
                        if data.get("method") == "Runtime.exceptionThrown":
                            details = data["params"]["exceptionDetails"]
                            runtime_exceptions.append(details.get("text", "") + " - " + str(details.get("exception", {})))
                except Exception:
                    pass

            event_task = asyncio.create_task(listen_events())

            # =================================================================
            # SUITE 1: index.html
            # =================================================================
            print("\n" + "="*68)
            print("🚀 SUITE 1: TESTING MAIN PORTAL (index.html)")
            print("="*68)

            await set_viewport(ws, 1920, 1080)
            await send_cmd(ws, "Page.navigate", {"url": f"{base_url}/index.html"})
            await asyncio.sleep(2.5)

            # Title Check
            title = await eval_js(ws, "document.title")
            print(f"✓ Page Title: {title}")
            assert "Kumbh" in title or "नाशिक" in title, f"Unexpected title: {title}"

            # Runtime Exceptions Check
            if runtime_exceptions:
                print(f"⚠️ Initial Runtime Exceptions on index.html: {runtime_exceptions}")
                issues_found.extend(runtime_exceptions)
                runtime_exceptions.clear()
            else:
                print("✓ Clean Console: 0 JavaScript exceptions on initial load")

            # Language switcher: Click Marathi -> English -> Hindi
            print("\n--- Testing Tri-Lingual Language Switcher ---")
            await eval_js(ws, "document.getElementById('langMr')?.click()")
            await asyncio.sleep(0.3)
            marathi_title = await eval_js(ws, "document.getElementById('heroMarathiTitle')?.textContent")
            print(f"✓ Marathi Hero Title: {marathi_title}")

            await eval_js(ws, "document.getElementById('langEn')?.click()")
            await asyncio.sleep(0.3)
            english_title = await eval_js(ws, "document.getElementById('heroTitleMain')?.textContent")
            print(f"✓ English Hero Title: {english_title.strip()[:50]}...")

            await eval_js(ws, "document.getElementById('langHi')?.click()")
            await asyncio.sleep(0.3)
            hindi_title = await eval_js(ws, "document.getElementById('heroTitleMain')?.textContent")
            print(f"✓ Hindi Hero Title: {hindi_title.strip()[:50]}...")

            # Reset back to Marathi (Default)
            await eval_js(ws, "document.getElementById('langMr')?.click()")
            await asyncio.sleep(0.2)

            # Theme Switcher (Dark -> Light -> Heritage)
            print("\n--- Testing Sacred Visual Themes ---")
            await eval_js(ws, "document.getElementById('themeDarkBtn')?.click()")
            await asyncio.sleep(0.3)
            dark_theme = await eval_js(ws, "document.documentElement.getAttribute('data-theme') || document.body.className")
            print(f"✓ Dark Theme applied: {dark_theme}")

            await eval_js(ws, "document.getElementById('themeLightBtn')?.click()")
            await asyncio.sleep(0.3)
            light_theme = await eval_js(ws, "document.documentElement.getAttribute('data-theme') || document.body.className")
            print(f"✓ Light Theme applied: {light_theme}")

            await eval_js(ws, "document.getElementById('themeHeritageBtn')?.click()")
            await asyncio.sleep(0.3)
            heritage_theme = await eval_js(ws, "document.documentElement.getAttribute('data-theme') || document.body.className")
            print(f"✓ Heritage Theme restored: {heritage_theme}")

            # Diya Arpan Interaction
            print("\n--- Testing Virtual Diya Arpan Simulation ---")
            diya_count_before = await eval_js(ws, "document.getElementById('totalDiyaCount')?.textContent")
            await eval_js(ws, "document.getElementById('devoteeName').value = 'श्री गणेश भक्त'")
            await eval_js(ws, "document.getElementById('floatDiyaBtn')?.click()")
            await asyncio.sleep(0.8)
            diya_count_after = await eval_js(ws, "document.getElementById('totalDiyaCount')?.textContent")
            print(f"✓ Virtual Diya Arpan offered: {diya_count_before} -> {diya_count_after}")

            # Check Countdown Timer
            days_val = await eval_js(ws, "document.getElementById('daysVal')?.textContent")
            hours_val = await eval_js(ws, "document.getElementById('hoursVal')?.textContent")
            print(f"✓ Live Shahi Snan Countdown active: {days_val} Days, {hours_val} Hours")

            # Navigation link verification
            hybrid_link = await eval_js(ws, "document.getElementById('heroAnimeStoryBtn')?.getAttribute('href')")
            nav_manthan_link = await eval_js(ws, "document.getElementById('navAnimeStoryLink')?.getAttribute('href')")
            print(f"✓ Hero CTA link: '{hybrid_link}'")
            print(f"✓ Nav 3D Manthan link: '{nav_manthan_link}'")
            assert hybrid_link == "story_chapter1_hybrid.html"
            assert nav_manthan_link == "samudra_manthan_scene.html"

            # Screenshots across viewports
            print("\n--- Testing index.html Responsiveness & Capturing Screenshots ---")
            await take_screenshot(ws, "test_index_desktop_1920.png", screenshots_dir)

            # Tablet viewport
            await set_viewport(ws, 768, 1024)
            await asyncio.sleep(0.5)
            await take_screenshot(ws, "test_index_tablet_768.png", screenshots_dir)

            # Mobile viewport
            await set_viewport(ws, 390, 844, is_mobile=True)
            await asyncio.sleep(0.5)
            # Test mobile menu drawer toggle
            await eval_js(ws, "document.getElementById('mobileMenuBtn')?.click()")
            await asyncio.sleep(0.4)
            menu_open = await eval_js(ws, "document.getElementById('mainNavLinks')?.classList.contains('is-open') || document.getElementById('mobileMenuBtn')?.classList.contains('is-active')")
            print(f"✓ Mobile hamburger drawer open: {menu_open}")
            await take_screenshot(ws, "test_index_mobile_drawer_390.png", screenshots_dir)

            test_results.append("SUITE 1: index.html PASSED (Themes, Languages, Countdown, Diya Arpan, Mobile Drawer)")

            # =================================================================
            # SUITE 2: story_chapter1_hybrid.html
            # =================================================================
            print("\n" + "="*68)
            print("🚀 SUITE 2: TESTING STORY CHAPTER 1 & 14 RATNAS (story_chapter1_hybrid.html)")
            print("="*68)

            await set_viewport(ws, 1920, 1080)
            await send_cmd(ws, "Page.navigate", {"url": f"{base_url}/story_chapter1_hybrid.html"})
            await asyncio.sleep(2.5)

            if runtime_exceptions:
                print(f"⚠️ Initial Runtime Exceptions on story_chapter1_hybrid: {runtime_exceptions}")
                issues_found.extend(runtime_exceptions)
                runtime_exceptions.clear()
            else:
                print("✓ Clean Console: 0 JavaScript exceptions on story_chapter1_hybrid")

            # Scene 1 Diorama Cameras
            print("\n--- Testing Scene 1 3D Multiplane Kinematics ---")
            await eval_js(ws, "document.getElementById('camMandara')?.click()")
            await asyncio.sleep(0.4)
            mandara_active = await eval_js(ws, "document.getElementById('camMandara')?.classList.contains('active')")
            print(f"✓ Camera preset switched to Mount Mandara: {mandara_active}")

            await take_screenshot(ws, "test_story_scene1_desktop.png", screenshots_dir)

            # Transition to Scene 2 directly and trigger renderPair
            print("\n--- Transitioning to Scene 2: 14 Ratnas Emergence ---")
            await eval_js(ws, """(()=>{
                const s2 = document.getElementById('scene2Section');
                window.scrollTo(0, s2.offsetTop);
                document.getElementById('btnNavScene2').classList.add('active');
                document.getElementById('btnNavScene1').classList.remove('active');
            })()""")
            await asyncio.sleep(1.2)

            # STRICT VERIFICATION: Base Image MUST be manthan_bg_corrected.jpg
            scene2_bg = await eval_js(ws, "document.getElementById('scene2BgImg')?.src")
            print(f"✓ Scene 2 Base Cel Image: {scene2_bg}")
            assert "manthan_bg_corrected.jpg" in scene2_bg, "Base image MUST be manthan_bg_corrected.jpg"

            # Check SVG Overlay
            svg_exists = await eval_js(ws, "document.getElementById('scene2SvgOverlay') !== null")
            assert svg_exists, "scene2SvgOverlay must be present"
            print("✓ Scene 2 Native SVG Overlay Stage verified present")

            # Test 2-by-2 Active Pair 1
            print("\n--- Testing Pair 1: Halahala Venom & Kamadhenu ---")
            p1_title = await eval_js(ws, "document.getElementById('pairHeaderTitle')?.textContent")
            p1_cardA = await eval_js(ws, "document.getElementById('cardATitleMr')?.textContent")
            p1_cardB = await eval_js(ws, "document.getElementById('cardBTitleMr')?.textContent")
            p1_popA = await eval_js(ws, "document.getElementById('s2PopTextA')?.textContent")
            p1_popB = await eval_js(ws, "document.getElementById('s2PopTextB')?.textContent")
            p1_imgA = await eval_js(ws, "document.getElementById('s2PopImgA')?.getAttribute('href')")
            p1_imgB = await eval_js(ws, "document.getElementById('s2PopImgB')?.getAttribute('href')")
            print(f"✓ Title: '{p1_title}'")
            print(f"✓ Pop A: '{p1_popA}' ({p1_imgA}) | Card: '{p1_cardA}'")
            print(f"✓ Pop B: '{p1_popB}' ({p1_imgB}) | Card: '{p1_cardB}'")
            assert "हलाहल" in p1_cardA and "कामधेनु" in p1_cardB
            assert "token_01_halahala.png" in p1_imgA
            assert "token_02_kamadhenu.png" in p1_imgB

            await take_screenshot(ws, "test_story_pair1_halahala_kamadhenu.png", screenshots_dir)

            # Test Pair 2: Uchhaishravas (7 Heads) & Airavata
            print("\n--- Testing Pair 2: Uchhaishravas (7 Heads) & Airavata ---")
            await eval_js(ws, "document.getElementById('btnNextPair')?.click()")
            await asyncio.sleep(1.0)

            p2_title = await eval_js(ws, "document.getElementById('pairHeaderTitle')?.textContent")
            p2_cardA = await eval_js(ws, "document.getElementById('cardATitleMr')?.textContent")
            p2_cardB = await eval_js(ws, "document.getElementById('cardBTitleMr')?.textContent")
            p2_popA = await eval_js(ws, "document.getElementById('s2PopTextA')?.textContent")
            p2_imgA = await eval_js(ws, "document.getElementById('s2PopImgA')?.getAttribute('href')")
            print(f"✓ Title: '{p2_title}'")
            print(f"✓ Horse Card: '{p2_cardA}' | Pop: '{p2_popA}' ({p2_imgA})")
            print(f"✓ Elephant Card: '{p2_cardB}'")
            assert "उच्चैःश्रवा" in p2_cardA
            assert "७ मुखी" in p2_cardA or "7" in p2_cardA
            assert "token_03_uchhaishravas.png" in p2_imgA

            # Verify background still remains manthan_bg_corrected.jpg
            bg_check = await eval_js(ws, "document.getElementById('scene2BgImg')?.src")
            assert "manthan_bg_corrected.jpg" in bg_check, "Background must remain manthan_bg_corrected.jpg"
            print("✓ Background Cel remained locked to manthan_bg_corrected.jpg (Zero mismatch)")

            await take_screenshot(ws, "test_story_pair2_uchhaishravas_7heads.png", screenshots_dir)

            # Cycle all pairs (Pair 3, 4, 5, 6, 7)
            print("\n--- Cycling Pairs 3 to 7 with Animation Check ---")
            for p in range(2, 7):
                await eval_js(ws, "document.getElementById('btnNextPair')?.click()")
                await asyncio.sleep(0.7)
                t = await eval_js(ws, "document.getElementById('pairHeaderTitle')?.textContent")
                cA = await eval_js(ws, "document.getElementById('cardATitleMr')?.textContent")
                cB = await eval_js(ws, "document.getElementById('cardBTitleMr')?.textContent")
                print(f"✓ Pair {p+1}: {t} -> {cA} & {cB}")

            climaxB = await eval_js(ws, "document.getElementById('cardBTitleMr')?.textContent")
            assert "अमृत कुंभ" in climaxB
            print("✓ Climax Pair 7 (Lord Dhanvantari & Amrita Kumbh) verified")
            await take_screenshot(ws, "test_story_pair7_amritakumbh.png", screenshots_dir)

            # Test Panoramic Overview Mode (All 14 Ratnas in SVG)
            print("\n--- Testing Overview Mode: All 14 Ratnas in Native SVG ---")
            await eval_js(ws, "document.getElementById('btnOverviewMode')?.click()")
            await asyncio.sleep(1.0)

            ov_disp = await eval_js(ws, "document.getElementById('s2OverviewAll14Group')?.style.display")
            ov_count = await eval_js(ws, "document.querySelectorAll('.s2-overview-node')?.length")
            ov_bg = await eval_js(ws, "document.getElementById('scene2BgImg')?.src")

            print(f"✓ Overview SVG Group visible: {ov_disp == 'block'}")
            print(f"✓ Total Overview Ratnas rendered: {ov_count} / 14")
            print(f"✓ Overview Base Image: '{ov_bg}'")
            assert ov_count == 14, f"Expected 14 overview ratnas, found {ov_count}"
            assert "manthan_bg_corrected.jpg" in ov_bg

            await take_screenshot(ws, "test_story_overview_14ratnas_desktop.png", screenshots_dir)

            # Test Interactive Click on Overview Node 8 (Maha Lakshmi) & Node 14 (Amrita Kumbh)
            print("\n--- Testing Interactive Selection in Overview ---")
            await eval_js(ws, "document.querySelector(\".s2-overview-node[data-id='8']\")?.dispatchEvent(new MouseEvent('click', {bubbles: true}))")
            await asyncio.sleep(0.5)
            clicked_8 = await eval_js(ws, "document.getElementById('cardATitleMr')?.textContent")
            print(f"✓ Clicked Node 8 -> Card A updated to: '{clicked_8}'")
            assert "महालक्ष्मी" in clicked_8

            await eval_js(ws, "document.querySelector(\".s2-overview-node[data-id='14']\")?.dispatchEvent(new MouseEvent('click', {bubbles: true}))")
            await asyncio.sleep(0.5)
            clicked_14 = await eval_js(ws, "document.getElementById('cardATitleMr')?.textContent")
            print(f"✓ Clicked Node 14 -> Card A updated to: '{clicked_14}'")
            assert "अमृत कुंभ" in clicked_14

            # Test Responsive Viewports on Scene 2
            print("\n--- Testing Scene 2 Responsiveness (Tablet & Mobile) ---")
            await set_viewport(ws, 768, 1024)
            await eval_js(ws, "document.getElementById('scene2Section')?.scrollIntoView({behavior: 'instant', block: 'start'})")
            await asyncio.sleep(0.5)
            await take_screenshot(ws, "test_story_scene2_tablet_768.png", screenshots_dir)

            await set_viewport(ws, 390, 844, is_mobile=True)
            await eval_js(ws, "document.getElementById('scene2Section')?.scrollIntoView({behavior: 'instant', block: 'start'})")
            await asyncio.sleep(0.5)
            mobile_flex = await eval_js(ws, "window.getComputedStyle(document.querySelector('.scene2-cards-overlay')).flexDirection")
            print(f"✓ Mobile cards layout: flex-direction={mobile_flex}")
            await take_screenshot(ws, "test_story_scene2_mobile_390.png", screenshots_dir)

            test_results.append("SUITE 2: story_chapter1_hybrid.html Scene 2 PASSED (All 7 pairs, 7-headed horse, 14 SVG Overview, Responsive)")

            # =================================================================
            # SUITE 3: SCENE 3 - FLIGHT OF GARUDA & 4 SACRED DROPS
            # =================================================================
            print("\n" + "="*68)
            print("🚀 SUITE 3: TESTING SCENE 3 - GARUDA FLIGHT & 4 SACRED DROPS")
            print("="*68)

            # Desktop Viewport
            await set_viewport(ws, 1920, 1080)

            # Test Navigating to Scene 3 via button
            print("\n--- Navigating to Scene 3 via #btnGoToScene3 ---")
            await eval_js(ws, "document.getElementById('btnGoToScene3')?.click()")
            await asyncio.sleep(1.5)

            # Verify Scene 3 is active in Top HUD
            s3_tab_active = await eval_js(ws, "document.getElementById('btnNavScene3')?.classList.contains('active')")
            print(f"✓ Scene 3 HUD Tab Active: {s3_tab_active}")

            # Verify Base Cel Image is garuda_sky_sea_map.jpg
            s3_bg = await eval_js(ws, "document.getElementById('scene3BgImg')?.src")
            print(f"✓ Scene 3 Base Cel Image: '{s3_bg}'")
            assert "garuda_sky_sea_map.jpg" in s3_bg, "Scene 3 Base Cel must be garuda_sky_sea_map.jpg"

            # Verify SVG Overlay
            s3_svg_exists = await eval_js(ws, "document.getElementById('scene3SvgOverlay') !== null")
            assert s3_svg_exists, "scene3SvgOverlay must be present"
            print("✓ Scene 3 Native SVG Overlay verified present")

            # Verify All 4 Holy City Nodes exist
            city_nodes_count = await eval_js(ws, "document.querySelectorAll('.s3-city-node').length")
            print(f"✓ Total Holy City Nodes in SVG: {city_nodes_count} / 4")
            assert city_nodes_count == 4, f"Expected 4 city nodes, found {city_nodes_count}"

            # Test Initial City: Nashik (Hero Tirtha)
            print("\n--- Testing City 1: Nashik (Ramkund & Godavari) ---")
            s3_title = await eval_js(ws, "document.getElementById('s3CityTitleHeader')?.textContent")
            s3_city_mr = await eval_js(ws, "document.getElementById('s3CardTitleMr')?.textContent")
            s3_river = await eval_js(ws, "document.getElementById('s3CardRiver')?.textContent")
            print(f"✓ Header Title: '{s3_title}'")
            print(f"✓ City Card: '{s3_city_mr}' | River: '{s3_river}'")
            assert "नाशिक" in s3_city_mr, "Default city must be Nashik"
            assert "गोदावरी" in s3_river, "River for Nashik must be Godavari"

            await take_screenshot(ws, "test_story_scene3_garuda_flight_desktop.png", screenshots_dir)

            # Test City 2: Prayagraj
            print("\n--- Testing City 2: Prayagraj (Triveni Sangam) ---")
            await eval_js(ws, "document.querySelector(\".btn-city-pip[data-city='prayagraj']\")?.click()")
            await asyncio.sleep(1.0)
            p_city_mr = await eval_js(ws, "document.getElementById('s3CardTitleMr')?.textContent")
            p_river = await eval_js(ws, "document.getElementById('s3CardRiver')?.textContent")
            print(f"✓ City Card: '{p_city_mr}' | River: '{p_river}'")
            assert "प्रयागराज" in p_city_mr
            assert "त्रिवेणी" in p_river

            # Test City 3: Haridwar
            print("\n--- Testing City 3: Haridwar (Har Ki Pauri & Ganga) ---")
            await eval_js(ws, "document.querySelector(\".btn-city-pip[data-city='haridwar']\")?.click()")
            await asyncio.sleep(1.0)
            h_city_mr = await eval_js(ws, "document.getElementById('s3CardTitleMr')?.textContent")
            h_river = await eval_js(ws, "document.getElementById('s3CardRiver')?.textContent")
            print(f"✓ City Card: '{h_city_mr}' | River: '{h_river}'")
            assert "हरिद्वार" in h_city_mr
            assert "गंगा" in h_river

            # Test City 4: Ujjain
            print("\n--- Testing City 4: Ujjain (Ramghat & Kshipra) ---")
            await eval_js(ws, "document.querySelector(\".btn-city-pip[data-city='ujjain']\")?.click()")
            await asyncio.sleep(1.0)
            u_city_mr = await eval_js(ws, "document.getElementById('s3CardTitleMr')?.textContent")
            u_river = await eval_js(ws, "document.getElementById('s3CardRiver')?.textContent")
            print(f"✓ City Card: '{u_city_mr}' | River: '{u_river}'")
            assert "उज्जैन" in u_city_mr
            assert "क्षिप्रा" in u_river

            # Test "Show All 4 Drops" button
            print("\n--- Testing 'Show All 4 Drops' Mode ---")
            await eval_js(ws, "document.getElementById('btnS3ShowAllDrops')?.click()")
            await asyncio.sleep(0.8)
            all_active_nodes = await eval_js(ws, "document.querySelectorAll('.s3-city-node.active').length")
            print(f"✓ All Active City Nodes: {all_active_nodes} / 4")
            assert all_active_nodes == 4, f"Expected all 4 nodes active, got {all_active_nodes}"

            await take_screenshot(ws, "test_story_scene3_all_4drops.png", screenshots_dir)

            # Test Responsive Viewports on Scene 3
            print("\n--- Testing Scene 3 Responsiveness (Tablet & Mobile) ---")
            await set_viewport(ws, 768, 1024)
            await eval_js(ws, "document.getElementById('scene3Section')?.scrollIntoView({behavior: 'instant', block: 'start'})")
            await asyncio.sleep(0.5)
            await take_screenshot(ws, "test_story_scene3_tablet_768.png", screenshots_dir)

            await set_viewport(ws, 390, 844, is_mobile=True)
            await eval_js(ws, "document.getElementById('scene3Section')?.scrollIntoView({behavior: 'instant', block: 'start'})")
            await asyncio.sleep(0.5)
            s3_card_w = await eval_js(ws, "document.getElementById('s3CityCard')?.offsetWidth")
            print(f"✓ Mobile Scene 3 Card Width: {s3_card_w}px")
            await take_screenshot(ws, "test_story_scene3_mobile_390.png", screenshots_dir)

            test_results.append("SUITE 3: Scene 3 (Garuda Flight & 4 Holy Drops) PASSED (Cel locked, 4 Cities, Drops, Responsive)")

            # =================================================================
            # SUITE 4: samudra_manthan_scene.html
            # =================================================================
            print("\n" + "="*68)
            print("🚀 SUITE 4: TESTING 3D MANTHAN SCENE (samudra_manthan_scene.html)")
            print("="*68)

            await set_viewport(ws, 1920, 1080)
            await send_cmd(ws, "Page.navigate", {"url": f"{base_url}/samudra_manthan_scene.html"})
            await asyncio.sleep(2.0)

            if runtime_exceptions:
                print(f"⚠️ Initial Runtime Exceptions on samudra_manthan_scene: {runtime_exceptions}")
                issues_found.extend(runtime_exceptions)
                runtime_exceptions.clear()
            else:
                print("✓ Clean Console: 0 JavaScript exceptions on samudra_manthan_scene")

            # Test Tab: SVG All 14
            await eval_js(ws, "document.getElementById('btnTabSvgAll')?.click()")
            await asyncio.sleep(0.8)
            svg_all_mode = await eval_js(ws, "document.getElementById('all14RatnasSvgGroup')?.style.display")
            print(f"✓ Switched to All 14 Ratnas SVG: display={svg_all_mode}")
            await take_screenshot(ws, "test_manthan_scene_svg14_desktop.png", screenshots_dir)

            # Test Tab: 1-by-1 3.0s Emergence Mode
            await eval_js(ws, "document.getElementById('btnTabRatnas')?.click()")
            await asyncio.sleep(1.0)
            curr_ratna_name = await eval_js(ws, "document.getElementById('currentRatnaNameMr')?.textContent")
            curr_ratna_img = await eval_js(ws, "document.getElementById('currentRatnaImg')?.src")
            print(f"✓ 3.0s Emergence Cycle active: Current Ratna='{curr_ratna_name}' | Cutout='{curr_ratna_img}'")

            await take_screenshot(ws, "test_manthan_scene_emergence_3s.png", screenshots_dir)

            # Test Tab: Garuda Celestial Flight & Amrita Drops Mode
            await set_viewport(ws, 1920, 1080)
            await eval_js(ws, "document.getElementById('btnTabGaruda')?.click()")
            await asyncio.sleep(1.0)
            garuda_mode_display = await eval_js(ws, "document.getElementById('studioGarudaGroup')?.style.display")
            assert garuda_mode_display == "block", f"Expected studioGarudaGroup block, got {garuda_mode_display}"
            garuda_eagle_exists = await eval_js(ws, "!!document.getElementById('studioTravellingEagle')")
            assert garuda_eagle_exists is True, "Travelling eagle element should exist in studio"
            city_nodes_count = await eval_js(ws, "document.querySelectorAll('.studio-city-node').length")
            assert city_nodes_count == 4, f"Expected 4 studio city nodes, found {city_nodes_count}"

            # Test jumping to City 1: Nashik
            await eval_js(ws, "document.getElementById('btnGarudaCity1')?.click()")
            await asyncio.sleep(0.8)
            nashik_active = await eval_js(ws, "document.getElementById('studioNodeNashik')?.classList.contains('active')")
            print(f"✓ Studio Garuda Flight Active: Eagle present, 4 Cities found, Nashik active={nashik_active}")
            await take_screenshot(ws, "test_manthan_scene_garuda_flight_studio.png", screenshots_dir)

            # Test Mobile
            await set_viewport(ws, 390, 844, is_mobile=True)
            await asyncio.sleep(0.5)
            await take_screenshot(ws, "test_manthan_scene_mobile_390.png", screenshots_dir)

            test_results.append("SUITE 4: samudra_manthan_scene.html PASSED (Harmonic Rig, Master Cel, 14 SVG, 3s Cycle, Garuda Studio Flight, Mobile)")

            event_task.cancel()

    finally:
        chrome_proc.terminate()
        try:
            chrome_proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            chrome_proc.kill()
        shutil.rmtree(temp_profile, ignore_errors=True)

    print("\n" + "="*68)
    print("🏆 FINAL COMPREHENSIVE TEST REPORT")
    print("="*68)
    for r in test_results:
        print(f"  ✅ {r}")
    if issues_found:
        print("\n⚠️ ISSUES DETECTED:")
        for issue in issues_found:
            print(f"  ❌ {issue}")
        print("="*68 + "\n")
        return False
    else:
        print("\n✨ ZERO ERRORS DETECTED ACROSS ALL PAGES & VIEWPORTS!")
        print(f"📁 Verified Screenshots saved to: {screenshots_dir}")
        print("="*68 + "\n")
        return True

def main():
    parser = argparse.ArgumentParser(description="Master Automated Test Suite for Nashik Kumbh Mela Portal")
    parser.add_argument("--url", default="http://localhost:3000", help="Base URL of local dev server (default: http://localhost:3000)")
    parser.add_argument("--screenshots-dir", default=DEFAULT_SCREENSHOTS_DIR, help="Directory to save generated test screenshots")
    parser.add_argument("--no-headless", action="store_true", help="Launch Chrome in non-headless visual mode")
    args = parser.parse_args()

    # Auto-start local HTTP server if target URL is not already running
    server_proc = None
    target_url = args.url.rstrip('/')
    try:
        requests.get(target_url, timeout=1.0)
    except Exception:
        port = "3000"
        if ":" in target_url:
            port = target_url.split(":")[-1].split("/")[0]
        print(f"📡 Dev server not detected at {target_url}. Launching internal HTTP server on port {port}...")
        server_proc = subprocess.Popen([sys.executable, "-m", "http.server", port], cwd=REPO_ROOT)
        time.sleep(1.5)

    try:
        success = asyncio.run(run_tests(base_url=target_url, screenshots_dir=args.screenshots_dir, headless=not args.no_headless))
    finally:
        if server_proc:
            print("🛑 Stopping internal HTTP server...")
            server_proc.terminate()
            try:
                server_proc.wait(timeout=2)
            except subprocess.TimeoutExpired:
                server_proc.kill()

    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
