var magicSword; 
var playTime;
var loadTime;
var amp;
var level;
// a shader variable
let theShader;

function preload(){
  magicSword = loadSound("624.mp3");
  theShader = loadShader('basic.vert', 'basic.frag');
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  // account that timing to "millis" starts at preload (1.3-1.6) sec delay
  if (magicSword.isLoaded()){
    loadTime = millis();
    print(loadTime);
    magicSword.play();
  }
  
  amp = new p5.Amplitude();

  cnv.mouseClicked(function() {
    if (magicSword.isPlaying() ){
      magicSword.stop();
    } else {
      magicSword.play();
    }
  });

  fft = new p5.FFT();
}

function draw(){
  camera(0, 0, -1400, 0, 0, 0, 0, 1, 0);

  playTime = millis() - loadTime;
  print(mouseX, mouseY);
  mappedColor = map(level, 0, 1, 0, 255);
  //background(mappedColor * 2);
  background(0);

  // shader() sets the active shader with our shader
  //shader(theShader);
  //stroke(200-mappedc,200-mappedc,200-mappedc);

  var spectrum = fft.analyze();
  var treble = fft.getEnergy("treble");
  var mid = fft.getEnergy("mid");
  var base = fft.getEnergy("bass");
  
  level = amp.getLevel();
  cSize2 = map(level * 0.1, 0, 1, 0, width);
  cSizeA = treble * 0.000012;
  cSizeB = mid * 0.000008;
  cSizeC = base * 0.000004;

  push();
  stroke(0);
  strokeWeight(.5);
  rotateX(frameCount * cSizeC);
  rotateY(frameCount * cSizeC);
  rotateZ(frameCount * cSizeC);
  //nofill();
  fill(mid, treble, base);
  torus(base*3.5,treble * 0.6, 80);
  pop();

  push();
  strokeWeight(.5);
  rotateX(frameCount * cSizeB);
  rotateY(frameCount * -cSizeB);
  rotateZ(frameCount * cSizeB);
  fill(treble, mid, base);
  torus(base*2.5,treble * 0.4, 80);
  pop();

  push();
  strokeWeight(.5);
  rotateX(frameCount * -cSizeA);
  rotateY(frameCount * -cSizeA);
  rotateZ(frameCount * -cSizeA);
  fill(base, mid, treble);
  torus(base*1.3,treble * 0.2, 80);
  pop();

  push();
  cSize3 = map(level, 0, 1, 0, width);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * -0.01);
  stroke(255);
  strokeWeight(base);
  fill(base, treble, mid);
  box(cSize3 * 0.3);  
  pop();

}