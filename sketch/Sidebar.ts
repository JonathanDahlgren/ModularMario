class Sidebar implements DrawArea{
  w: number = width * 0.25;
  h: number = height;
  x: number = 0;
  y: number = 0;        

  draw(ladders: Array<LevelObject>, logs: Array<LevelObject>, stones: Array<LevelObject>) {
    fill(26, 9, 56);    
    rect(this.x, this.y, this.w, this.h);
    fill(220);
    textSize(30);
    textFont(gameFont)
    text(`Level: ${currentLevel + 1}`,this.w / 2, this.h * 0.1);
    textSize(18);
    
    textSize(22);
    text(`X ${ladders.length}`, this.w / 2, this.h * 0.25);
    image(ladderImage, this.w / 3, this.h * 0.2, 30, 60);

    text(`X ${logs.length}`, this.w / 2, this.h * 0.45);
    image(logImage, this.w / 4, this.h * 0.42, 60, 30);

    text(`X ${stones.length}`, this.w / 2, this.h * 0.65);
    image(stoneImage, this.w / 3, this.h * 0.62, 30, 30);     
  }
}