<!-- PHASE:1 -->
## Phase 1: Keboola Galaxy — Logo-accurate Particle System

### Branch
`phase-1-keboola-logo-galaxy`

### Scope

Redesign the `keboola` galaxy type in `/Users/vojtatuma/repos/orbit/index.html` so that:

1. **Sprite texture** (`galaxyTex` function, `type === 'keboola'` branch) draws a simplified version of the actual Keboola logo: a rounded blob head, two small eye dots, two sweeping arms curving outward and down, and two short legs.

2. **Particle system** (`createGalaxyPoints` function, `type === 'keboola'` branch) distributes particles in the shape of the Keboola logo. The logo SVG has viewBox 0-64, center (32,32). Mapping to galaxy coords: `galX = (svgX - 32) / 32 * R`, `galZ = -(svgY - 32) / 32 * R`.

   Key logo regions to implement as particle clusters:
   - **Head oval**: dense oval cluster centered at galX≈0, galZ≈+20, radii roughly 24×30. Use Keboola blue (#3ca0ff = [0.24,0.63,1.0]).
   - **Left eye**: dense circle at galX≈−5.5, galZ≈−2.75, radius≈4.5. White/bright.
   - **Right eye**: dense circle at galX≈+5.5, galZ≈−2.75, radius≈4.5. White/bright.
   - **Left arm**: cubic bezier from (−8,−8) → outer (−42,−5) → (−38,−20) → inner (−22,−32). Keboola blue/cyan.
   - **Right arm**: mirror of left arm. Keboola blue/cyan.
   - **Left leg**: stream from (−22,−32) curving to (−10,−52). Keboola blue.
   - **Right leg**: stream from (+22,−32) curving to (+10,−52). Keboola blue.
   - **Scatter sparks**: orange (failed ETL) and green (successful transforms) dotted around.

   Particle count = 16000. Rough distribution:
   - Head: 28% = 4480
   - Eyes: 6% × 2 = 1920
   - Arms: 16% × 2 = 5120
   - Legs: 12% × 2 = 3840
   - Sparks: remainder ≈ 640

3. **No other changes** to the file. Only modify the `type === 'keboola'` branches inside `galaxyTex` and `createGalaxyPoints`.

### Files to Create/Modify
- `/Users/vojtatuma/repos/orbit/index.html` — modify only the two `keboola` branches

### Acceptance Criteria
- [ ] `galaxyTex` keboola branch draws a sprite that resembles the Keboola logo character (head oval, two eyes, arms, no letter K)
- [ ] `createGalaxyPoints` keboola branch distributes particles in head + eyes + arms + legs pattern
- [ ] Particle total ≤ 16000 and all array positions are written (no out-of-bounds)
- [ ] Syntax check passes: `node --check /tmp/orbit_check.mjs` after extracting the script
- [ ] No other galaxy types are affected

### Tests Required
Run after implementation:
```bash
python3 -c "
html = open('/Users/vojtatuma/repos/orbit/index.html').read()
start = html.find('<script type=\"module\">')
end = html.rfind('</script>')
script = html[start+len('<script type=\"module\">'):end]
open('/tmp/orbit_check.mjs', 'w').write(script)
" && node --check /tmp/orbit_check.mjs && echo "SYNTAX OK"
```
<!-- /PHASE:1 -->
