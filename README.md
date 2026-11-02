# ATLAS Takeoff — Version 1

Standalone browser-based DXF wall framing takeoff prototype.

## What V1 does

- Opens ASCII DXF files directly in the browser.
- Reads LINE, LWPOLYLINE, and basic POLYLINE geometry.
- Lets you tap/select a line as a wall.
- Assigns a wall number, height, stud size, gauge, spacing, top track, and bottom track.
- Calculates stud quantity without drawing individual studs.
- Supports double end studs and a waste percentage.
- Keeps takeoff quantities separated by wall number.
- Builds a combined material summary grouped by stud size, gauge, and height.
- Exports the wall takeoff as CSV.
- Supports pan and zoom, including touch/pinch use.

## Run it

No server or installation is required for the basic prototype.

1. Put `index.html`, `style.css`, and `app.js` in the same folder.
2. Open `index.html` in a modern browser.
3. Choose **Open DXF**.
4. Select the correct DXF units if Auto cannot detect them.
5. Tap a line, enter wall properties, and press **Save Wall**.

It is also suitable for GitHub Pages because it is a static site.

## Current stud formula

For a straight wall without openings:

`base studs = ceil(wall length in inches / spacing) + 1`

If **Double end studs** is checked, two extra studs are added (one additional stud at each end).

Waste is then applied and the result is rounded up.

This is intentionally a simple first-pass framing rule. Doors, windows, intersections, corners, jambs, headers, cripples, kickers, and special framing conditions should be handled in later versions rather than hidden inside the basic formula.

## DXF notes

Version 1 is deliberately lightweight and dependency-free. It currently focuses on straight segments from:

- LINE
- LWPOLYLINE
- POLYLINE / VERTEX

Arcs, splines, blocks/inserts, dimensions, and text are not required for wall takeoff yet and are not used as selectable wall geometry in V1.

## Suggested next steps

1. Add a calibration tool: select two points and enter a known dimension.
2. Add openings (doors/windows) to a wall record.
3. Add corner/intersection rules.
4. Add drywall and insulation quantities.
5. Add project save/open.
6. Add Excel export and printable takeoff report.
7. Add wall color/status filters and search by wall number.


## iPhone / iPad file picker

Version 1.1 uses a real **Open DXF** button and intentionally does not use an HTML `accept` filter. Some iOS/Safari versions hide `.dxf` files when that filter is present.

Tap **Open DXF**, choose **Browse**, then select the DXF from Files / iCloud Drive / Downloads.


## Version 1.2 — scale calibration

For DXF files converted from PDF or other sources where drawing units may not be trustworthy:

1. Open the DXF.
2. Press **Calibrate Scale**.
3. Tap the first point of a known dimension.
4. Tap the second point.
5. Enter the actual feet and inches.
6. Press **Apply Calibration**.

ATLAS Takeoff stores a calibrated feet-per-DXF-unit factor and uses it for all wall lengths, stud counts, track quantities, and CSV output. Changing the DXF unit setting resets calibration so an old scale cannot silently remain attached to a different unit interpretation.


## Version 1.3 calibration controls

Calibration now matches the ATLAS Layout style:

1. Tap **Scale 1**, then tap the first known point.
2. Tap **Scale 2**, then tap the second known point.
3. Enter the known feet/inches.
4. Tap **Apply Calibration**.

Scale 1 and Scale 2 can be changed independently. The active Scale button is highlighted, and each selected point is marked `1` or `2` on the drawing.


## Version 1.4 — WALL tool restored and made explicit

No takeoff functionality was removed.

The top toolbar now has three independent working controls:

- **WALL** — select a DXF line and show all wall takeoff options.
- **Scale 1** — set the first scale point.
- **Scale 2** — set the second scale point.

After calibration is applied, the app automatically returns to **WALL** mode. On iPad/mobile, selecting a wall also brings the full Selected Wall panel into view.

The existing wall fields remain:
wall number, length, height, stud size, gauge, spacing, top track, bottom track, double end studs, waste, calculated studs, calculated track, wall takeoff table, material summary, and CSV export.


## Version 1.5 — Manual corner tracing + Wall Type Library

This version keeps all previous functionality and adds two new workflows.

### TRACE WALLS — manual corner-to-corner selection

This works like the point sequence used in ATLAS Layout, but there are no X1/X2 labels.

1. Choose the **Active type** (optional).
2. Tap **TRACE WALLS**.
3. Tap the first DXF corner/end point.
4. Tap the next corner. A wall is created between those two points.
5. Keep tapping the next corners to create wall after wall.

The trace mode snaps only to DXF endpoints/corners. It does not automatically choose a point along a line. The original **WALL** tool still selects existing DXF line segments normally.

Each traced segment is automatically saved as a wall with the current Active Type and receives the next W-### wall number.

### Wall Type Library

Wall types are reusable framing assemblies stored in the browser.

A wall type stores:

- Height
- Stud size
- Gauge
- Stud spacing
- Top track type
- Bottom track type
- Double end stud setting
- Waste percentage

Enter a type name such as `W1`, `W2`, or `Shaft Wall` and press **Save / Update Type**. The type then appears in the Active Type selector and can be applied to future walls.

### Wall Type Totals

Walls are grouped by type and the program totals:

- Number of walls
- Total wall length
- Total stud quantity
- Total top track LF
- Total bottom track LF

The detailed Wall Takeoff table also shows the type assigned to each individual wall, and CSV export now includes the Wall Type column.


## Version 1.6 — Compact everyday toolbar

The main toolbar now keeps only the tools used constantly:

- Open DXF
- WALL
- TRACE WALLS
- More

The **More** menu contains the less-used setup/actions:

- Fit Drawing
- Scale 1
- Scale 2
- DXF units
- Export CSV

The Scale Calibration panel is hidden during normal wall takeoff. It appears only when Scale 1 or Scale 2 is selected, and hides again after calibration is applied or when WALL / TRACE WALLS is selected.

No measuring, wall takeoff, wall type, calibration, summary, or export functionality was removed.


## Version 1.7 — Bluebeam-style Takeoff Markups List

The wall takeoff list now behaves more like a Bluebeam Markups List.

### Individual markup management

Every saved or traced wall appears as an individual Takeoff Markup. Each row keeps:

- Wall number
- Wall type
- Length
- Height
- Stud size / gauge
- Stud quantity

Tap a row to select the wall. Use **Locate** to center/highlight it on the drawing. Use **Delete** to remove only that wall.

Deleting a manually traced wall also removes its orange/manual wall segment from the drawing. Deleting an original DXF-line takeoff removes only the takeoff record and leaves the DXF geometry untouched.

### Undo Last

Takeoff changes now keep an undo history (up to 50 takeoff states).

**Undo Last** can recover from:

- Creating a wall
- Tracing a wall
- Editing/saving a wall
- Deleting an individual wall
- Clear All

### Filter by wall type

The Markups List can show all wall types or only one selected wall type. Wall Type Totals and Material Summary still calculate from the complete takeoff, not only the filtered rows.

No existing scale, wall type, trace, takeoff, totals, material summary, or CSV functionality was removed.
\n\n## Version 1.8 — Larger viewer, independent scrolling, Trace Lock\n\n- The message strip below the plan is reduced to a thin one-line status bar.\n- The plan viewer stays in place; the takeoff/control column scrolls independently instead of moving the whole page.\n- On iPad/phone layouts the screen is split so the plan keeps most of the height and the controls below have their own scroll area.\n- **TRACE LOCK** works like a reuse/continuous takeoff tool. Turn it on once and TRACE WALLS stays active as you keep choosing corner after corner.\n- With Trace Lock off, TRACE WALLS creates one wall and returns to normal WALL mode.\n- Pressing WALL or entering Scale mode turns Trace Lock off intentionally.\n\nAll previous takeoff, wall type, Markups List, delete, Undo, totals, scale, and CSV functionality remains.\n

## Version 1.9 — Selected DELETE, visible Trace Lock, Bluebeam-style FIND

### DELETE selected wall

A compact **DELETE** button is now available beside the viewer controls.

1. Select any saved takeoff wall.
2. DELETE becomes active.
3. Press DELETE to remove that one takeoff markup.

The existing confirmation and **Undo Last** history remain. If the wall came from TRACE WALLS, its generated trace segment is removed. If it came from the original DXF, the source DXF geometry is left untouched.

On desktop, the keyboard Delete/Backspace key can also delete the selected saved markup when you are not typing in a form field.

### TRACE LOCK selected state

When Trace Lock is ON:

- The button changes to a bright green.
- Its text changes to `TRACE LOCK ✓`.
- The state remains visible until the lock is turned off.

### FIND selected wall

A compact **FIND** button is now available beside DELETE.

Select a saved wall and press FIND. The viewer:

- centers that wall in the plan window,
- zooms it to a useful viewing size,
- highlights/selects the wall,
- shows the found wall number in the status strip.

The Markups List `Locate` action is now labeled **Find** and uses the same centering/zoom behavior.


## Version 2.0 — Current Type, Saved Projects and Full-Screen Plan

### Active wall type displayed beside TRACE LOCK

`TYPE: W1` is always visible beside TRACE LOCK and updates as you choose another type in the viewer selector or Wall Type Library. The unassigned state is amber; a selected type is green.

### Save a whole project (not just a CSV)

- Press **Save Project**, give a name, and save it to browser IndexedDB.
- Press **Projects ▾** to see named saved jobs, open them without importing the DXF again, or delete an old saved job.
- All selectable DXF segments, manually traced walls, markup list and quantities, scale calibration, wall type definitions, and active type are included.
- **Download Backup (.json)** creates a portable file you can store in Files/Dropbox/Drive.
- **Import Backup** restores a portable file to this browser's saved project list.
- Saved project names can be reused to update the same job. A button at the top saves changes to the currently named job.

**Important:** Saved jobs stay on the device and browser where you save them. Private browsing or clearing site data may remove them. Download a backup to move jobs to another device or to protect important work. Save is manual; there is no background autosave in this release. Use Save Project after significant changes.

### Full Screen

Press **Full Screen** on the plan viewer toolbar. The viewer expands to cover the device window, including on iPad Safari where browser-native fullscreen support varies. Press **Exit Full Screen** or Escape to return. Existing zoom/pan and wall selection stay intact.


## Version 2.1 — Dedicated Wall Type Editor

Wall types can now be edited directly without selecting a wall first.

- Each Wall Type Library card has an **Edit** button.
- The current active type also has an **Edit Active** button.
- The editor changes type name, height, stud size, gauge, spacing, top track, bottom track, double-end setting, and waste percentage.
- **Update all existing walls assigned to this wall type** is checked by default. When saved, those walls are recalculated and the Wall Type Totals / Material Summary refresh immediately.
- Renaming a wall type updates existing wall assignments to the new name.
- Deleting a wall type from the editor leaves existing wall geometry/takeoff records in place but marks those walls Unassigned.


## Version 2.2 — Collapsible option panels

The takeoff option panels can now be collapsed independently to free up more screen space.

Collapsible sections include:

- Selected Wall
- Wall Type Library
- Takeoff Markups
- Wall Type Totals
- Material Summary

The Selected Wall and Wall Type Library panels start open. Totals and Material Summary start collapsed.

Two compact controls are added above the options column:

- **Collapse** — closes all option panels.
- **Expand** — opens all option panels.

Selecting a wall automatically reopens the Selected Wall panel, so the wall-editing controls are still immediately available when needed.

No takeoff, trace, scale, delete, find, wall-type, project-save, full-screen, summary, or export functionality was removed.


## Version 2.3 — Wall Type Library scroll fix

The Wall Type Library now has its own vertical scroll area.

This fixes the issue where only the first few saved wall types were visible after the option panels became collapsible.

The plan viewer and the rest of the options area stay in place while the wall-type list itself scrolls independently.


## Version 2.6 — guaranteed scrolling in every collapsible tab

This version is built from the stable Version 2.3 panel/Markups structure.

All open collapsible tabs now use one explicit internal scroll container:

- Selected Wall
- Wall Type Library
- Takeoff Markups
- Wall Type Totals
- Material Summary

Scrolling works through:

- Mouse wheel
- Finger swipe on iPad / touch devices
- Small ▲ / ▼ fallback buttons inside every open panel

The Takeoff Markups logic, table, Find, Delete, Undo, filters, collapse/open behavior, and wall-type logic were not restructured.


## Version 2.7 — compact controls + persistent full-screen viewer

### Maximum plan area

The main toolbar is now roughly half its previous height.

Always-visible controls are reduced to:

- OPEN
- WALL
- TRACE
- LOCK
- Current wall type
- OPTIONS

Save/Open Project, Fit, Scale, units, CSV and project backup tools remain available under OPTIONS.

The controls beside the plan viewer are now hidden inside a compact **VIEW** menu:

- Active wall type
- Find
- Delete
- Full Screen
- Scale status
- Wall count

No function was removed.

### Persistent full-screen viewer

ATLAS now uses its own fixed-position full-screen/focus mode on every device instead of relying on the browser's native Fullscreen API.

This is intentional because Safari/iPad can dismiss native fullscreen after touch gestures, browser UI changes, rotation, or returning from another app.

Once Full Screen is activated, ATLAS reasserts the viewer after resize/orientation/visibility changes and stays full-screen until:

- **Exit Full Screen** is pressed, or
- Escape is pressed on a keyboard.

Tracing, selecting walls, Find, Delete, pan, zoom, and other plan interactions no longer exit full screen.


## Version 2.8 — ORTHO + trace pause/resume + grouped Markups

### Collapsible panels
The ▲ / ▼ scroll buttons were removed from every collapsible panel. Touch swipe and mouse-wheel scrolling remain active, so the buttons no longer cover panel content.

### TRACE LOCK is now pause/resume
TRACE LOCK no longer sends the app back to WALL.

- TRACE starts recording.
- LOCK off = pause recording.
- LOCK on = resume the same trace chain from the same last point.
- WALL is now the explicit way to leave trace mode.

### ORTHO LOCK
A new ORTHO button is available in the normal toolbar and in full-screen mode.

When enabled, each new traced wall is constrained perfectly horizontal or vertical from the previous trace point, using the dominant direction of the tapped corner.

### Markups grouped by wall type
The Markups table now groups walls by wall type.

- Tap a wall-type group header to hide/show only that group.
- **Hide Groups** collapses all wall-type groups.
- **Show Groups** expands all groups.
- Find, Delete, Undo, filters, totals, and individual wall selection still work.


## Version 2.9 — New trace chain after LOCK pause

TRACE LOCK now works as a chain break:

1. Trace connected walls.
2. Turn LOCK off at the last corner.
3. Move to a different area.
4. Turn LOCK back on.
5. The next tap becomes a new starting point.

Turning LOCK off clears the previous trace endpoint, so the next area will not connect back to the last dot from the prior sequence.

TRACE mode itself stays active.


## Version 2.14 — Restore four-point temporary AREA totals

AREA is restored as a temporary four-point takeoff tool.

Workflow:

1. Tap **AREA SELECT**.
2. Tap four boundary points around the portion of the drawing you want to inspect.
3. Press **CLOSE AREA**.
4. ATLAS temporarily totals only the saved takeoff walls inside/intersecting that closed area.
5. The temporary totals show:
   - Wall count
   - Stud count
   - Linear feet
6. Material Summary and Wall Type Totals also use only the closed temporary area.
7. Walls included in the temporary area highlight green.
8. Press **CLEAR** to remove the temporary area and return to full-project totals.

The closed area is temporary and is not saved as a named project area.

Version 2.9 TRACE LOCK behavior remains unchanged.

## Functional Frame checkpoint and wall assemblies

The working application before assembly changes is preserved in `../Functional Frame/` and `../Functional Frame.zip`.

### Quantity assemblies

Open TAKEOFF > Wall Type Library > New Assembly, or Edit an existing type.
Studs and track continue using the existing framing rules. Add drywall, insulation,
or custom accessory parts. Each part has a material name, output unit, base
(wall area, wall length, each wall, or stud count), factor, waste percentage,
and optional rounding up per wall. Quantity = base x factor x (1 + waste / 100).
The live example uses a 10 LF wall at the selected height.

Drywall starts at two faces (factor 2); insulation starts at one wall area
(factor 1). These are editable starting values, not project specifications.
Area is gross length x height; openings are not deducted yet. Framing waste
applies to studs/track, while additional parts use their own waste. A part
based on stud count starts from studs including framing waste.

Assembly parts are copied onto saved walls. Editing a type with Update all
existing walls checked replaces those walls' assembly parts and framing settings.
With it unchecked, the assembly change affects future walls. Existing saved
walls retain their previous materials. Renames still update wall assignments.
Projects and JSON backups include the parts. Older projects without parts
continue to work. Material Summary adds assembly quantities for visible layers
and the current temporary area, if any. CSV remains the original framing-wall
export; it does not yet export additional assembly material rows.

### Reusable parts library and folders

The assembly editor has a Parts library dropdown grouped into folders. It includes
top/bottom track attachments by substrate, stud-to-track screw sizes, drywall
screw point styles and lengths, drywall, insulation, tape, compound, and sanding.
Catalog labels are choices, not automatic fastener specifications. Accessory
quantity factors begin at zero and must be set to match the job.

Use + Custom Part for a new screw or material. Type a Library folder (or choose
an existing one), name the material, set its unit, basis, factor and waste, then
press Save / Update in Library. The same folder/name updates that library part;
other names create new entries. The reusable library is saved to this browser
and included in project JSON backups. Library edits do not change existing
assembly rows or saved walls until you apply the updated part/assembly.

## Doors and quantity formulas — current version

Keep `quantities.js` alongside app.js, index.html and style.css when copying or
hosting this version. The earlier Functional Frame checkpoint remains unchanged.

### Add a door later

Save/trace the wall, click DOOR, then point to the opening center on a saved,
visible wall. Enter rough width/height and location. Jambs default to two pieces
per side (four total); choose metal or wood. Jamb pieces are full wall height.
Set header track runs and header depth. The header quantity is opening width
times runs; allowance for bends/bearing is not added automatically. Use the
specified opening/header dimensions for the job. Doors cannot overlap or extend
beyond their wall. Changing wall height or drawing scale must keep doors valid.

Regular stud-grid positions inside or at opening boundaries are replaced by the
configured jamb pieces. Above-header cripple studs follow the original stud grid
strictly within the opening width. Full-height metal studs, cripple lengths,
wood jamb pieces, header track and bottom track are separately summarized.
Framing waste rounds each length group up; wood dimensions beyond height must
still be specified. Top track stays continuous, bottom track deducts door widths.
Door edits/removal, Undo, project/JSON save/open and framing CSV are supported.
DOOR mode also edits an existing opening when tapped. Selected Wall lists its
openings with Edit Door and Remove Door. Source DXF geometry is preserved.

### Confirmed estimating rules

- Compound: installed board area / 320 SF per 5-gallon bucket.
- Drywall screws: installed board SF x 1. Choose the required screw type/length.
- Concrete nails: top/bottom track LF / 10 x 8, before part waste/rounding.
- Paper tape: shared joints counted once plus outer/opening edges, divided by
  250 LF per roll. Defaults to vertical 4x10 sheets, joint grid from wall start.
- Framing screws and door-nail rates remain unset/editable.

In Wall Type Library > Edit/New Assembly, add a drywall board part in SF first.
Its factor represents faces/layers. Board width and height are editable. Installed
board-area bases exclude board purchasing waste and deduct doors. Tape estimates
include board faces/layers in the assembly; select a different basis/factor for
assemblies where only outer layers are finished. The layout assumes a single
rectangular wall face, regular sheet grid and unshifted rows. It is an estimating
layout; staggered joints, returns and corners are not modeled.

Use + My Compound & Tape Rules to add the confirmed bucket/roll formulas. These
keep fractional usage for aggregation; rounding per wall is optional. Existing
saved assemblies retain their old material rates until explicitly edited/updated.
Multiply, coverage, and spacing formulas are available for custom parts. Spacing
uses ceil(run LF x 12 / spacing inches) + 1 per run; separated bottom-track runs
are counted individually. Stored material-library recipes include the formulas.

Run quantity tests with `node tests/quantities.cjs`. `tests/ui-door-fixture.json`
is generated test data for the browser checks, not a customer project.

## 2D stud dots
Saved and traced walls now show stud positions at their configured spacing,
starting at the wall start and including the far end. VIEW > Stud dots toggles
the overlay, including in full-screen mode. Zoom in to inspect closely spaced dots.
Solid dots are full-height studs; hollow dots are above-door cripples.
Purple dots are metal jambs; orange dots are wood jambs. Multiple jambs are
shown side by side across the line; extra end studs use an offset dot.
These symbol offsets are visual only, not member-width geometry.
Waste does not add dots. Wall number labels may cover a dot at the wall midpoint.
Layout follows each individual wall start; continuous corner/intersection framing
and configurable layout offsets are not modeled.
Run node tests/stud-positions.cjs to verify placement against framing quantities.

## Reusable door types and grouped counts
In the Door dialog, enter rough dimensions, jambs and header settings, give the
type a name (for example D1), and choose Save / Update Type. Select that type for
other openings. New doors automatically reuse the last selected type; each keeps
its own label and location. Editing a dimension or framing setting changes the
current opening to Custom until you save it as a type again.
TAKEOFF > Door Type Counts lists all project doors grouped by type and saved
details, with a total. Counts include hidden wall layers and ignore temporary
area selection. Older doors appear as Custom / unassigned until assigned a type.
Updating a type affects future placements only; existing doors retain their
saved dimensions/framing and different variants show separate count rows.
Types are saved in browser storage and included in project saves/JSON backups.
Individual doors retain type assignments through the existing Undo/save system.
Run node tests/door-types.cjs for door-type workflow checks.

## Door type layers
Open DOORS beside LAYERS in the viewer (also available in full-screen).
Every door type has a checkbox, a placed-door count, and an Only button.
Only isolates that type; Show all restores every door mark. Custom/unassigned
doors have a separate layer. Types use stable colors and plan labels show type
plus the individual door label. The status reports visible vs total placements.
Door mark visibility is independent of wall-type layers and does not change
quantities, stored openings, or stud layouts. Hidden doors still participate in
opening validation; tapping one in DOOR mode reveals its layer for editing.
Visibility choices are included in project saves and JSON backups.
These tools support visual comparison with source drawing door symbols; they
do not detect missing doors automatically. Run node tests/door-layers.cjs.

## Live door framing sketch
The Door dialog now includes a responsive front-elevation sketch. It updates
on input and when applying a saved door type. The sketch shows nearby wall
studs, full-height metal/wood jambs, above-header cripples, top/bottom tracks,
opening dimensions, and header track run count/depth. It uses the existing
wall stud grid and ignores purchasing waste. Invalid openings clear the sketch
and show the validation message.
The current header model is track runs and header depth; separate boxed or
engineered header profiles are not selectable. Member thickness and separation
between multiple pieces/runs are schematic. Nearby wall context is cropped.
Keep door-sketch.js beside the other application files when copying or hosting.
Run node tests/door-sketch.cjs to check rendering variants and integration.

## Continuous green DOOR mode
DOOR turns green and displays a checkmark while active. Save, cancel, closing the
door editor, and Escape keep placement active for the next opening. Press DOOR
again to switch it off. Choosing WALL, TRACE or scale tools also exits door mode,
as does loading another drawing/project. Existing door types and live sketch
continue to work during repeated placement.
Run node tests/door-mode.cjs for continuous-placement checks.

## Project wall libraries and lock
Wall Type Library now has a library name, Lock/Unlock Library, Rename, and
New Project Library. Existing libraries start locked. Unlock to create, edit,
rename or delete type definitions, then Lock Library when ready. Locked types
remain selectable for tracing/takeoff; individual wall editing is still allowed.
Save Project and JSON backups include definitions, library name and lock state.
Opening a saved project replaces the current wall-type definitions rather than
merging them with another job. Older projects receive a named locked library.
New Project Library starts empty and unlocked. Save the current project first
to retain its old library. Existing walls retain their material values and
quantities, but become Unassigned to prevent matching type names from another
designer updating them. Undo Last can restore this library reset.
New Project Library changes the library only, not the drawing or project name;
use Save Project to associate it with the appropriate job.
Run node tests/wall-libraries.cjs for workflow checks.
