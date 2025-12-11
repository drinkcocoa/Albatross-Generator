// ============================================
// ALBATROSS GENERATOR
// Created with Jay and Dilano at Sogang Univ.
// ============================================

// ============================================
// CONSTANTS - Default values and constraints
// ============================================
const DEFAULTS = {
  // Head parameters
  HEAD_SIZE: 38,
  HEAD_SIZE_MIN: 33,
  HEAD_SIZE_MAX: 41,
  HEAD_COLOR: '#f0f0f0',

  // Eyes parameters
  EYES_SIZE: 10,
  EYES_SIZE_MIN: 7,
  EYES_SIZE_MAX: 11,
  EYES_COLOR: '#323232',

  // Beak parameters
  BEAK_LENGTH: 30,
  BEAK_LENGTH_MIN: 10,
  BEAK_LENGTH_MAX: 100,
  BEAK_COLOR: '#f5c162',
  BEAK_RADIUS: 8,

  // Neck parameters
  NECK_LENGTH: 50,
  NECK_LENGTH_MIN: 30,
  NECK_LENGTH_MAX: 140,
  NECK_ANGLE: 15,
  NECK_ANGLE_MIN: 2.5,
  NECK_ANGLE_MAX: 30,
  NECK_RADIUS: 15,
  NECK_COLOR: '#f0f0f0',

  // Leg parameters
  LEG_LENGTH: 50,
  LEG_LENGTH_MIN: 30,
  LEG_LENGTH_MAX: 150,
  LEG_RADIUS: 2,
  LEG_COLOR: '#FFBF00',
  FEET_RADIUS: 10,
  FEET_HEIGHT: 2,

  // Body parameters
  BODY_WIDTH: 35,
  BODY_WIDTH_MIN: 30,
  BODY_WIDTH_MAX: 40,
  BODY_LENGTH: 40,
  BODY_LENGTH_MIN: 35,
  BODY_LENGTH_MAX: 55,
  BODY_DEPTH: 60,
  BODY_COLOR: '#f0f0f0',

  // Wing parameters
  WING_LENGTH: 50,
  WING_LENGTH_MIN: 40,
  WING_LENGTH_MAX: 68,
  WING_THICKNESS: 30,
  WING_THICKNESS_MIN: 25,
  WING_THICKNESS_MAX: 40,
  WING_DEPTH: 15,
  WING_COLOR: '#d2d2d2',

  // Camera parameters
  CAMERA_LIMIT: 600,
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 400,
  UI_PANEL_WIDTH: 600,
  UI_PANEL_HEIGHT: 280,

  // Background
  BACKGROUND_SPHERE_RADIUS_OFFSET: 600,

  // Hat
  HAT_TYPE: 'none'
};

// ============================================
// GLOBAL VARIABLES
// ============================================
let defaultFont;
let backImage1, backImage2, backImage3, backImage4;
let cvs, uiCvs;
let cam;

// UI Controls
let headSlider, headPicker;
let eyesSlider, eyesPicker;
let beakSlider, beakPicker;
let neckSlider, neckPicker, neckAngleSlider;
let legSlider, legPicker;
let bodyWSlider, bodyLSlider, bodyPicker;
let wingSlider, wingTSlider, wingPicker;
let hatSelecter, bgSelecter;
let resetBtn, randomizeBtn, saveBtn, helpBtn;

// Value display elements
let valueDisplays = {};

// Help panel state
let showHelp = false;

// ============================================
// PRELOAD - Load assets before setup
// ============================================
function preload() {
  try {
    defaultFont = loadFont('assets/fonts/default_font.ttf');
    backImage1 = loadImage('assets/images/backImage1.jpg');
    backImage2 = loadImage('assets/images/backImage2.jpg');
    backImage3 = loadImage('assets/images/backImage3.jpg');
    backImage4 = loadImage('assets/images/backImage4.jpg');
  } catch (error) {
    console.error('Error loading assets:', error);
  }
}

// ============================================
// SETUP - Initialize canvas and UI controls
// ============================================
function setup() {
  // Create main 3D canvas
  cvs = createCanvas(DEFAULTS.CANVAS_WIDTH, DEFAULTS.CANVAS_HEIGHT, WEBGL);
  cvs.parent('canvas-container');
  cam = createCamera();
  textFont(defaultFont);
  normalMaterial();

  // Create UI panel
  createUIPanel();

  // Create all controls
  createControls();

  // Create action buttons
  createActionButtons();
}

// ============================================
// CREATE UI PANEL
// ============================================
function createUIPanel() {
  uiCvs = createGraphics(DEFAULTS.UI_PANEL_WIDTH, DEFAULTS.UI_PANEL_HEIGHT);
  uiCvs.parent('ui-container');
}

// ============================================
// CREATE CONTROLS - Sliders and color pickers
// ============================================
function createControls() {
  const leftColX = 150;
  const rightColX = 440;
  let currentY = 85;

  // Head controls
  headSlider = createSlider(DEFAULTS.HEAD_SIZE_MIN, DEFAULTS.HEAD_SIZE_MAX, DEFAULTS.HEAD_SIZE);
  headSlider.position(leftColX, currentY);
  headPicker = createColorPicker(DEFAULTS.HEAD_COLOR);
  headPicker.position(90, currentY);

  // Eyes controls
  eyesSlider = createSlider(DEFAULTS.EYES_SIZE_MIN, DEFAULTS.EYES_SIZE_MAX, DEFAULTS.EYES_SIZE);
  eyesSlider.position(rightColX, currentY);
  eyesPicker = createColorPicker(DEFAULTS.EYES_COLOR);
  eyesPicker.position(380, currentY);

  currentY += 30;

  // Beak controls
  beakSlider = createSlider(DEFAULTS.BEAK_LENGTH_MIN, DEFAULTS.BEAK_LENGTH_MAX, DEFAULTS.BEAK_LENGTH);
  beakSlider.position(leftColX, currentY);
  beakPicker = createColorPicker(DEFAULTS.BEAK_COLOR);
  beakPicker.position(90, currentY);

  // Leg controls
  legSlider = createSlider(DEFAULTS.LEG_LENGTH_MIN, DEFAULTS.LEG_LENGTH_MAX, DEFAULTS.LEG_LENGTH);
  legSlider.position(rightColX, currentY);
  legPicker = createColorPicker(DEFAULTS.LEG_COLOR);
  legPicker.position(380, currentY);

  currentY += 30;

  // Neck controls
  neckSlider = createSlider(DEFAULTS.NECK_LENGTH_MIN, DEFAULTS.NECK_LENGTH_MAX, DEFAULTS.NECK_LENGTH);
  neckSlider.position(leftColX, currentY);
  neckPicker = createColorPicker(DEFAULTS.NECK_COLOR);
  neckPicker.position(90, currentY);

  // Hat selector
  hatSelecter = createSelect();
  hatSelecter.position(475, currentY);
  hatSelecter.option('none');
  hatSelecter.option('mortarboard');
  hatSelecter.option('conical hat');
  hatSelecter.option('party hat');
  hatSelecter.selected(DEFAULTS.HAT_TYPE);

  currentY += 30;

  // Neck angle slider
  neckAngleSlider = createSlider(DEFAULTS.NECK_ANGLE_MIN, DEFAULTS.NECK_ANGLE_MAX, DEFAULTS.NECK_ANGLE, 0.1);
  neckAngleSlider.position(leftColX, currentY);

  // Background selector
  bgSelecter = createSelect();
  bgSelecter.position(475, currentY);
  bgSelecter.option('backImage1');
  bgSelecter.option('backImage2');
  bgSelecter.option('backImage3');
  bgSelecter.option('backImage4');

  currentY += 30;

  // Body width slider
  bodyWSlider = createSlider(DEFAULTS.BODY_WIDTH_MIN, DEFAULTS.BODY_WIDTH_MAX, DEFAULTS.BODY_WIDTH);
  bodyWSlider.position(leftColX, currentY);
  bodyPicker = createColorPicker(DEFAULTS.BODY_COLOR);
  bodyPicker.position(90, currentY);

  // Wing length slider
  wingSlider = createSlider(DEFAULTS.WING_LENGTH_MIN, DEFAULTS.WING_LENGTH_MAX, DEFAULTS.WING_LENGTH);
  wingSlider.position(rightColX, currentY);
  wingPicker = createColorPicker(DEFAULTS.WING_COLOR);
  wingPicker.position(380, currentY);

  currentY += 30;

  // Body length slider
  bodyLSlider = createSlider(DEFAULTS.BODY_LENGTH_MIN, DEFAULTS.BODY_LENGTH_MAX, DEFAULTS.BODY_LENGTH);
  bodyLSlider.position(leftColX, currentY);

  // Wing thickness slider
  wingTSlider = createSlider(DEFAULTS.WING_THICKNESS_MIN, DEFAULTS.WING_THICKNESS_MAX, DEFAULTS.WING_THICKNESS);
  wingTSlider.position(rightColX, currentY);

  // Add input event listeners to all sliders for real-time updates
  [headSlider, eyesSlider, beakSlider, neckSlider, neckAngleSlider,
   legSlider, bodyWSlider, bodyLSlider, wingSlider, wingTSlider].forEach(slider => {
    slider.input(redraw);
  });
}

// ============================================
// CREATE ACTION BUTTONS
// ============================================
function createActionButtons() {
  const buttonY = 265;
  const buttonSpacing = 90;
  let buttonX = 20;

  // Reset button
  resetBtn = createButton('Reset');
  resetBtn.position(buttonX, buttonY);
  resetBtn.mousePressed(resetToDefaults);
  resetBtn.class('action-btn');

  buttonX += buttonSpacing;

  // Randomize button
  randomizeBtn = createButton('Randomize');
  randomizeBtn.position(buttonX, buttonY);
  randomizeBtn.mousePressed(randomizeValues);
  randomizeBtn.class('action-btn');

  buttonX += buttonSpacing;

  // Save button
  saveBtn = createButton('Save Image');
  saveBtn.position(buttonX, buttonY);
  saveBtn.mousePressed(saveImage);
  saveBtn.class('action-btn');

  buttonX += buttonSpacing;

  // Help button
  helpBtn = createButton('Help [H]');
  helpBtn.position(buttonX, buttonY);
  helpBtn.mousePressed(toggleHelp);
  helpBtn.class('action-btn');
}

// ============================================
// RESET TO DEFAULTS
// ============================================
function resetToDefaults() {
  headSlider.value(DEFAULTS.HEAD_SIZE);
  headPicker.value(DEFAULTS.HEAD_COLOR);

  eyesSlider.value(DEFAULTS.EYES_SIZE);
  eyesPicker.value(DEFAULTS.EYES_COLOR);

  beakSlider.value(DEFAULTS.BEAK_LENGTH);
  beakPicker.value(DEFAULTS.BEAK_COLOR);

  neckSlider.value(DEFAULTS.NECK_LENGTH);
  neckAngleSlider.value(DEFAULTS.NECK_ANGLE);
  neckPicker.value(DEFAULTS.NECK_COLOR);

  legSlider.value(DEFAULTS.LEG_LENGTH);
  legPicker.value(DEFAULTS.LEG_COLOR);

  bodyWSlider.value(DEFAULTS.BODY_WIDTH);
  bodyLSlider.value(DEFAULTS.BODY_LENGTH);
  bodyPicker.value(DEFAULTS.BODY_COLOR);

  wingSlider.value(DEFAULTS.WING_LENGTH);
  wingTSlider.value(DEFAULTS.WING_THICKNESS);
  wingPicker.value(DEFAULTS.WING_COLOR);

  hatSelecter.selected(DEFAULTS.HAT_TYPE);
  bgSelecter.selected('backImage1');
}

// ============================================
// RANDOMIZE VALUES
// ============================================
function randomizeValues() {
  headSlider.value(random(DEFAULTS.HEAD_SIZE_MIN, DEFAULTS.HEAD_SIZE_MAX));
  headPicker.value(color(random(200, 255), random(200, 255), random(200, 255)));

  eyesSlider.value(random(DEFAULTS.EYES_SIZE_MIN, DEFAULTS.EYES_SIZE_MAX));
  eyesPicker.value(color(random(0, 100), random(0, 100), random(0, 100)));

  beakSlider.value(random(DEFAULTS.BEAK_LENGTH_MIN, DEFAULTS.BEAK_LENGTH_MAX));
  beakPicker.value(color(random(200, 255), random(150, 200), random(50, 100)));

  neckSlider.value(random(DEFAULTS.NECK_LENGTH_MIN, DEFAULTS.NECK_LENGTH_MAX));
  neckAngleSlider.value(random(DEFAULTS.NECK_ANGLE_MIN, DEFAULTS.NECK_ANGLE_MAX));
  neckPicker.value(color(random(200, 255), random(200, 255), random(200, 255)));

  legSlider.value(random(DEFAULTS.LEG_LENGTH_MIN, DEFAULTS.LEG_LENGTH_MAX));
  legPicker.value(color(random(200, 255), random(150, 200), random(0, 100)));

  bodyWSlider.value(random(DEFAULTS.BODY_WIDTH_MIN, DEFAULTS.BODY_WIDTH_MAX));
  bodyLSlider.value(random(DEFAULTS.BODY_LENGTH_MIN, DEFAULTS.BODY_LENGTH_MAX));
  bodyPicker.value(color(random(200, 255), random(200, 255), random(200, 255)));

  wingSlider.value(random(DEFAULTS.WING_LENGTH_MIN, DEFAULTS.WING_LENGTH_MAX));
  wingTSlider.value(random(DEFAULTS.WING_THICKNESS_MIN, DEFAULTS.WING_THICKNESS_MAX));
  wingPicker.value(color(random(180, 220), random(180, 220), random(180, 220)));

  const hats = ['none', 'mortarboard', 'conical hat', 'party hat'];
  hatSelecter.selected(random(hats));

  const backgrounds = ['backImage1', 'backImage2', 'backImage3', 'backImage4'];
  bgSelecter.selected(random(backgrounds));
}

// ============================================
// SAVE IMAGE
// ============================================
function saveImage() {
  const timestamp = new Date().toISOString().slice(0, 10);
  const filename = `albatross-${timestamp}-${Math.floor(Math.random() * 1000)}`;
  saveCanvas(cvs, filename, 'png');
  console.log(`Image saved: ${filename}.png`);
}

// ============================================
// TOGGLE HELP PANEL
// ============================================
function toggleHelp() {
  showHelp = !showHelp;
}

// ============================================
// DRAW UI PANEL
// ============================================
function drawUIPanel() {
  uiCvs.background(230);
  uiCvs.textFont(defaultFont);

  // Title
  uiCvs.textSize(40);
  uiCvs.fill(50);
  uiCvs.text('Albatross Generator', 20, 50);

  // Description
  uiCvs.textSize(10);
  uiCvs.fill(80);
  uiCvs.text('Adjust the sliders and color pickers to design your own special bird!', 20, 65);

  // Labels for controls
  uiCvs.textAlign(LEFT, CENTER);
  uiCvs.textSize(16);
  uiCvs.fill(60);

  let labelY = 94;

  // Left column labels
  uiCvs.text('Head', 30, labelY);
  uiCvs.text(headSlider.value(), 280, labelY);

  // Right column labels
  uiCvs.text('Eyes', 320, labelY);
  uiCvs.text(eyesSlider.value(), 570, labelY);

  labelY += 30;

  uiCvs.text('Beak', 30, labelY);
  uiCvs.text(beakSlider.value(), 280, labelY);

  uiCvs.text('Legs', 320, labelY);
  uiCvs.text(legSlider.value(), 570, labelY);

  labelY += 30;

  uiCvs.text('Neck', 30, labelY);
  uiCvs.text(neckSlider.value(), 280, labelY);

  uiCvs.text('Hat', 320, labelY);

  labelY += 30;

  uiCvs.text('Angle', 30, labelY);
  uiCvs.text(neckAngleSlider.value().toFixed(1), 280, labelY);

  uiCvs.text('Background', 320, labelY);

  labelY += 30;

  uiCvs.text('Body W', 30, labelY);
  uiCvs.text(bodyWSlider.value(), 280, labelY);

  uiCvs.text('Wing L', 320, labelY);
  uiCvs.text(wingSlider.value(), 570, labelY);

  labelY += 30;

  uiCvs.text('Body L', 30, labelY);
  uiCvs.text(bodyLSlider.value(), 280, labelY);

  uiCvs.text('Wing T', 320, labelY);
  uiCvs.text(wingTSlider.value(), 570, labelY);

  // Display UI canvas
  image(uiCvs, -DEFAULTS.CANVAS_WIDTH / 2, -DEFAULTS.CANVAS_HEIGHT / 2 - DEFAULTS.UI_PANEL_HEIGHT);
}

// ============================================
// DRAW HELP PANEL
// ============================================
function drawHelpPanel() {
  if (!showHelp) return;

  push();
  // Semi-transparent background
  fill(0, 0, 0, 200);
  rect(-280, -180, 560, 360);

  // Help content
  fill(255);
  textSize(24);
  textAlign(CENTER, TOP);
  text('Keyboard Shortcuts', 0, -160);

  textSize(16);
  textAlign(LEFT, TOP);
  let helpY = -120;
  const helpX = -260;
  const lineHeight = 30;

  text('S - Save current design as image', helpX, helpY);
  helpY += lineHeight;

  text('R - Randomize all parameters', helpX, helpY);
  helpY += lineHeight;

  text('D - Reset to default values', helpX, helpY);
  helpY += lineHeight;

  text('H - Toggle this help panel', helpX, helpY);
  helpY += lineHeight;

  text('Mouse Drag - Rotate camera view', helpX, helpY);
  helpY += lineHeight;

  text('Mouse Scroll - Zoom in/out', helpX, helpY);
  helpY += lineHeight;

  textSize(14);
  fill(180);
  helpY += 20;
  text('Click anywhere or press H to close', helpX, helpY);

  pop();
}

// ============================================
// DRAW - Main render loop
// ============================================
function draw() {
  // Get current values from controls
  const headSize = headSlider.value();
  const eyesSize = eyesSlider.value();
  const beakLength = beakSlider.value();
  const neckLength = neckSlider.value();
  const neckAngle = neckAngleSlider.value();
  const legLength = legSlider.value();
  const bodyWidth = bodyWSlider.value();
  const bodyLength = bodyLSlider.value();
  const wingLength = wingSlider.value();
  const wingThickness = wingTSlider.value();

  const headColor = headPicker.color();
  const eyesColor = eyesPicker.color();
  const beakColor = beakPicker.color();
  const neckColor = neckPicker.color();
  const legColor = legPicker.color();
  const bodyColor = bodyPicker.color();
  const wingColor = wingPicker.color();

  const hatShape = hatSelecter.value();
  const bgType = bgSelecter.value();

  // Set background to black
  background(0);

  // Draw background sphere with selected texture
  push();
  const backgroundImage = {
    'backImage1': backImage1,
    'backImage2': backImage2,
    'backImage3': backImage3,
    'backImage4': backImage4
  }[bgType];

  if (backgroundImage) {
    texture(backgroundImage);
    rotateY(150);
    const sphereRadius = DEFAULTS.BACKGROUND_SPHERE_RADIUS_OFFSET +
                        max(abs(cam.eyeX), abs(cam.eyeY), abs(cam.eyeZ));
    sphere(sphereRadius);
  }
  pop();

  // Enable orbit controls for camera
  orbitControl();

  // Constrain camera position
  cam.eyeX = constrain(cam.eyeX, -DEFAULTS.CAMERA_LIMIT, DEFAULTS.CAMERA_LIMIT);
  cam.eyeY = constrain(cam.eyeY, -DEFAULTS.CAMERA_LIMIT, DEFAULTS.CAMERA_LIMIT);
  cam.eyeZ = constrain(cam.eyeZ, -DEFAULTS.CAMERA_LIMIT, DEFAULTS.CAMERA_LIMIT);

  // Position bird in scene
  translate(0, -legLength / 2 + 100, 0);
  rotateY(PI);

  // ============================================
  // DRAW BODY (origin point for bird)
  // ============================================
  translate(0, 0, -10);
  fill(bodyColor);
  ellipsoid(bodyWidth, bodyLength, DEFAULTS.BODY_DEPTH);

  // ============================================
  // DRAW WINGS
  // ============================================
  // Right wing
  push();
  fill(wingColor);
  translate(30, 0, 15);
  rotateZ(PI / 1.1);
  rotateY(PI / -2.1);
  rotateZ(PI / neckAngle / 3);
  ellipsoid(wingLength, wingThickness, DEFAULTS.WING_DEPTH, 30, 30);
  pop();

  // Left wing
  push();
  fill(wingColor);
  translate(-30, 0, 15);
  rotateZ(PI / -1.1);
  rotateY(PI / 2.1);
  rotateZ(PI / -neckAngle / 3);
  ellipsoid(wingLength, wingThickness, DEFAULTS.WING_DEPTH, 30, 30);
  pop();

  // ============================================
  // DRAW LEGS AND FEET
  // ============================================
  // Right leg and foot
  push();
  fill(legColor);
  translate(10, 46, 10);
  cylinder(DEFAULTS.LEG_RADIUS, legLength);
  translate(0, legLength / 2, -3);
  cylinder(DEFAULTS.FEET_RADIUS, DEFAULTS.FEET_HEIGHT);
  pop();

  // Left leg and foot
  push();
  fill(legColor);
  translate(-10, 46, 10);
  cylinder(DEFAULTS.LEG_RADIUS, legLength);
  translate(0, legLength / 2, -3);
  cylinder(DEFAULTS.FEET_RADIUS, DEFAULTS.FEET_HEIGHT);
  pop();

  // ============================================
  // DRAW NECK
  // ============================================
  push();
  fill(neckColor);
  rotateX(PI / neckAngle);
  rotateY(PI / 2);
  translate(20, -55, 0);
  cylinder(DEFAULTS.NECK_RADIUS, neckLength);

  // ============================================
  // DRAW HEAD (along with neck)
  // ============================================
  translate(0, -neckLength / 2, 0);
  fill(headColor);
  sphere(headSize);

  // ============================================
  // DRAW HAT (on top of head)
  // ============================================
  translate(0, -headSize, 0);
  rotateX(PI);

  switch (hatShape) {
    case 'conical hat':
      fill(200, 190, 150);
      cone(50, 50);
      break;

    case 'mortarboard':
      fill(50);
      cylinder(25, 40);
      translate(0, 20, 0);
      rotateY(45);
      box(70, 7, 70);
      rotateY(-45);
      translate(0, -20, 0);
      break;

    case 'party hat':
      fill(240, 100, 200);
      cone(30, 60);
      translate(0, 30, 0);
      fill(233, 233, 133);
      sphere(5);
      translate(0, -30, 0);
      break;

    case 'none':
    default:
      // No hat
      break;
  }

  rotateX(PI);

  // ============================================
  // DRAW EYES
  // ============================================
  fill(eyesColor);
  // Right eye
  translate(20, -10 + headSize, 20);
  sphere(eyesSize);
  // Left eye
  translate(0, 0, -40);
  sphere(eyesSize);

  // ============================================
  // DRAW BEAK (along with head)
  // ============================================
  translate(20, 10, 20);
  rotateZ(PI / -2);
  fill(beakColor);
  cone(DEFAULTS.BEAK_RADIUS, beakLength);

  pop();

  // Draw UI panel last (on top)
  drawUIPanel();

  // Draw help panel if active
  if (showHelp) {
    drawHelpPanel();
  }
}

// ============================================
// KEYBOARD CONTROLS
// ============================================
function keyTyped() {
  try {
    switch (key.toLowerCase()) {
      case 's':
        saveImage();
        break;
      case 'r':
        randomizeValues();
        break;
      case 'd':
        resetToDefaults();
        break;
      case 'h':
        toggleHelp();
        break;
    }
  } catch (error) {
    console.error('Error handling key press:', error);
  }
  return false;
}

// ============================================
// MOUSE CONTROLS
// ============================================
function mousePressed() {
  // Close help panel when clicking anywhere
  if (showHelp) {
    showHelp = false;
    return false;
  }
}

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
function windowResized() {
  // Handle responsive behavior if needed
  // Currently maintains fixed canvas size
}
