// let color = (240, 240, 240);
let default_font;
let title_font;
let neckRotate;
let backImage1;
let backImage2;
let backImage3;
let backImage4;

let cvs;
let cam;

new p5(function (p) {

  p.setup = function () {
    p.createCanvas(600, 280);
  };

  p.draw = function () {
    p.background(230);
    p.textFont(default_font);
    // p.textAlign(p.CENTER, p.TOP);
    p.textAlign(LEFT, [CENTER]);
    p.textSize(20);
    p.text("Head", 30, 100);
    p.text("Eyes", 320, 100);
    p.text("Beak", 30, 130);
    p.text("Neck", 30, 160);
    p.text("Legs", 320, 130);
    p.text("Body", 30, 220);
    //p.text("Length", 30, 160);
    //p.text("Width", 30, 160);
    p.text("Wing", 320, 220);
    //p.text("Length", 30, 220);
    //p.text("Thickness", 30, 250);
    p.text("Hat", 320, 160);
    p.text("Background", 320, 190);
    
    p.textSize(10);
    p.text("This is Albatross Generator, and adjust the sliders and color pickers if you want to design your own special bird!", 20, 65);
    
    //p.textFont(title_font);
    p.textSize(40);
    p.text("Albatross Generator", 20, 50);

  };
});

function preload() {
  default_font = loadFont("default_font.ttf");
  //title_font = loadFont("title_font.ttf");
  backImage1 = loadImage("backImage1.jpg");
  backImage2 = loadImage("backImage2.jpg");
  backImage3 = loadImage("backImage3.jpg");
  backImage4 = loadImage("backImage4.jpg");
}

function setup() {
  cvs = createCanvas(600, 400, WEBGL);
  cam = createCamera();
  textFont(default_font);
  normalMaterial();
  neckRotate = 20;
  

  //**this format and the label are the one set for each parameter

  headSlider = createSlider(33, 41, 38);
  headSlider.position(150, 85);
  headPicker = createColorPicker("#f0f0f0");
  headPicker.position(90, 85);

  eyesSlider = createSlider(7, 11, 10);
  eyesSlider.position(440, 85);
  eyesPicker = createColorPicker("#323232");
  eyesPicker.position(380, 85);

  beakSlider = createSlider(10, 100, 30);
  beakSlider.position(150, 115);
  beakPicker = createColorPicker("#f5c162");
  beakPicker.position(90, 115);

  neckSlider = createSlider(30, 140, 50);
  neckSlider.position(150, 145);
  neckPicker = createColorPicker("#f0f0f0");
  neckPicker.position(90, 145);
  // neckSlider.style('width', '160px');
  neckAngleSlider = createSlider(2.5, 30, 15);
  neckAngleSlider.position(150, 175);

  legSlider = createSlider(30, 150, 50);
  legSlider.position(440, 115);
  legPicker = createColorPicker("#FFBF00");
  legPicker.position(380, 115);
  //**Slider, Colorpicker, label(it's in above p.draw function)

  bodyWSlider = createSlider(30, 40, 35);
  bodyWSlider.position(150, 205);
  bodyLSlider = createSlider(35, 55, 40);
  bodyLSlider.position(150, 235);
  bodyPicker = createColorPicker("#f0f0f0");
  bodyPicker.position(90, 205);

  wingSlider = createSlider(40, 68, 50);
  wingSlider.position(440, 205);
  wingTSlider = createSlider(25, 40, 30);
  wingTSlider.position(440, 235);
  wingPicker = createColorPicker("#d2d2d2");
  wingPicker.position(380, 205);

  hatSelecter = createSelect();
  hatSelecter.position(475, 145);
  hatSelecter.option("none");
  hatSelecter.option("mortarboard");
  hatSelecter.option("conical hat");
  hatSelecter.option("party hat");
  
  bgSelecter = createSelect();
  bgSelecter.position(475, 175);
  bgSelecter.option("backImage1");
  bgSelecter.option("backImage2");
  bgSelecter.option("backImage3");
  bgSelecter.option("backImage4");

  //hatSlider = createSlider(6, 20, 10);
}
function draw() {
  // Initial Setting

  wingThickness = wingTSlider.value();
  bodyLength = bodyLSlider.value();
  bodyWidth = bodyWSlider.value();
  legLength = legSlider.value();
  neckLength = neckSlider.value();
  wingLength = wingSlider.value();
  headSize = headSlider.value();
  beakLength = beakSlider.value();
  eyesSize = eyesSlider.value();
  neckAngle = neckAngleSlider.value();
  //hatSize = hatSlider.value();
  hatShape = hatSelecter.value();
  bgType = bgSelecter.value();

  headColor = headPicker.color();
  eyesColor = eyesPicker.color();
  beakColor = beakPicker.color();
  neckColor = neckPicker.color();
  legColor = legPicker.color();
  bodyColor = bodyPicker.color();
  wingColor = wingPicker.color();

  // background(54, 99, 143);
  background(0);

  push();
  switch (bgType) {
      case "backImage1":
      texture(backImage1);
      break;
      
      case "backImage2":
      texture(backImage2);      
      break;

      case "backImage3":
      texture(backImage3);
      break;
      
      case "backImage4":
      texture(backImage4);    
      break;
  }
  rotateY(150);
  sphere(600 + max(abs(cam.eyeX), abs(cam.eyeY), abs(cam.eyeZ)));
  fill(180, 255, 225);
  translate(0, 160, 0);
  rotateX(PI / 2);
  //plane(1000,1000)
  pop();

  // Camera control
  orbitControl();
  push();
  if (cam.eyeX > 600) cam.eyeX = 600;
  if (cam.eyeX < -600) cam.eyeX = -600;
  if (cam.eyeY > 600) cam.eyeY = 600;
  if (cam.eyeY < -600) cam.eyeY = -600;
  if (cam.eyeZ > 600) cam.eyeZ = 600;
  if (cam.eyeZ < -600) cam.eyeZ = -600;
  pop();
  
  translate(0, -legLength / 2 + 100, 0);
  rotateY(PI);

  // Body the origin point
  translate(0, 0, -10);
  fill(bodyColor);
  ellipsoid(bodyWidth, bodyLength, 60);

  // Wing1 - along with the body
  push();
  fill(wingColor);
  translate(30, 0, 15);
  rotateZ(PI / 1.1);
  rotateY(PI / -2.1);
  rotateZ(PI / neckAngle / 3);
  ellipsoid(wingLength, wingThickness, 15, 30, 30);
  pop();

  //Wing2
  push();
  fill(wingColor);
  translate(-30, 0, 15);
  rotateZ(PI / -1.1);
  rotateY(PI / 2.1);
  rotateZ(PI / -neckAngle / 3);
  ellipsoid(wingLength, wingThickness, 15, 30, 30);
  pop();

  //leg1 and feet1
  push();
  fill(legColor);
  translate(10, 46, 10);
  cylinder(2, legLength);
  translate(0, legLength / 2, -3);
  cylinder(10, 2);
  pop();
  //leg2 and feet2
  push();
  fill(legColor);
  translate(-10, 46, 10);
  cylinder(2, legLength);
  translate(0, legLength / 2, -3);
  cylinder(10, 2);
  pop();

  // Neck
  push();
  fill(neckColor);
  rotateX(PI / neckAngle);
  rotateY(PI / 2);
  translate(20, -55, 0);
  cylinder(15, neckLength);

  // Head - along with the neck
  translate(0, -neckLength / 2, 0);
  fill(headColor);
  sphere(headSize);

  // Hat
  translate(0, -headSize, 0);
  rotateX(PI);
  switch (hatShape) {
    case "none":
      break;
    case "conical hat":
      fill(200, 190, 150);
      cone(50, 50);
      break;

    case "mortarboard":
      fill(50);
      cylinder(25, 40);
      translate(0, 20, 0);
      rotateY(45);
      box(70, 7, 70);
      rotateY(-45);
      translate(0, -20, 0);
      break;
      
    case "party hat":
      fill(240, 100, 200);
      cone(30, 60);
      translate(0,30,0);
      fill(233,233,133);
      sphere(5);
      translate(0,-30,0);
      break;
  }
  rotateX(PI);

  // eye1
  fill(eyesColor);
  translate(20, -10 + headSize, 20);
  sphere(eyesSize);
  // eye2
  translate(0, 0, -40);
  sphere(eyesSize);

  // Beak - along with the head
  translate(20, 10, 20);
  rotateZ(PI / -2);
  fill(beakColor);
  cone(8, beakLength);
  pop();

  textSize(50);
  //text("beak", 0, 0);
}


function keyTyped() {
  if (key === 's' || key === 'S') {
    saveCanvas('png');
    print("saving image");
  }
  return false;
  }