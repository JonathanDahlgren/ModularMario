class GameController {
  splashScreen = new SplashScreen(windowWidth, windowHeight, 0, 0);
  private gameArea = new GameArea();
  private sidebar = new Sidebar();
  public inBuildPhase: boolean = false; 
  public ladders: Array<LevelObject> = [];
  public logs: Array<LevelObject> = [];
  public stones: Array<LevelObject>= [];  //Activated when in building phase 
  private currentLevel: number = 0; //Keep track of currentLevel
  private levelFactory = new LevelFactory();
  level: Level = this.levelFactory.getLevel(this.currentLevel); //Save array of level objects in level variable
  
  //Draw the gameArea
  public drawGameArea() {    
    this.gameArea.draw();
  }

  public drawSidebar() {  //Draw the Sidebar
    this.sidebar.draw(this.currentLevel);     
}

    //Loop list of level objects and draw them
    public drawLevel() {        
        let char: number = 0; 
        this.ladders = [];
        this.logs = [];
        this.stones = [];       
        
        for(let i = 0; i < this.level.levelObjects.length; i++){
            this.level.levelObjects[i].draw();
            
            if (this.level.levelObjects[i].constructor == Character) {                
                char = i;
            } 
        }         
        return this.level.levelObjects[char];   //Return the Character object    
    }
    
    // public drawBuildLevel() {
    //     if (this.inBuildPhase) {
    //         this.level = this.levelFactory.getLevel(0); //Något annat än this.currentLevel för att hitta build nivån.
    //     }
    // }        
  
    //Loop list of level assets and draw them
    public drawAssets() {

        for(let i = 0; i < this.level.levelAssets.length; i++) {            
            switch (this.level.levelAssets[i].constructor) {
                case Ladder:
                    this.ladders.push(this.level.levelAssets[i]);
                    break;
                case Log:
                    this.logs.push(this.level.levelAssets[i]);                    
                    break;
                case Stone:
                    this.stones.push(this.level.levelAssets[i]);
                    break;
            }  
            this.level.levelAssets[i].draw();           
        }

        for (let i = 0; i < this.ladders.length; i++) {
            if (i == this.ladders.length - 1) {
                this.ladders[i].drawText(this.ladders.length);
            }
        }
        for (let i = 0; i < this.logs.length; i++) {
            if (i == this.logs.length - 1) {
                this.logs[i].drawText(this.logs.length);
            }
        }
        for (let i = 0; i < this.stones.length; i++) {
            if (i == this.stones.length - 1) {
                this.stones[i].drawText(this.stones.length);
            }
        }
    }

    public changeGamePhase() {
        if (this.inBuildPhase == false) {
            mySong.stop()
            buildMusic.setVolume(0.5);
            buildMusic.play();
            this.inBuildPhase = true;
        } else {
            buildMusic.stop()
            mySong.play()
            this.inBuildPhase = false;
        }
    }

    public buildPhase(assetNumber: number, ladderNbr: number) {
        if (this.inBuildPhase) {
            let builder = new Builder(this.inBuildPhase);      
            builder.inBuildMode(assetNumber, ladderNbr, this.ladders, this.logs, this.stones); 

        }
    }

    //Keep track of player versus all collidable objects
    public collisionDetection(character: Character) {        
        let collideBlocks: Array<LevelObject> = []; 

        //Loop through all objects and save the collideable ones in new array
        for(let i = 0; i < this.level.levelObjects.length; i++) {
            if (this.level.levelObjects[i].constructor == Block){
                collideBlocks.push(this.level.levelObjects[i]);
            }
        }
        
        //Determine what collision is and what should happen when collision occur
        for(let i = 0; i < collideBlocks.length; i++){
            //let d = dist(character.x, character.y, collideBlocks[i].x, collideBlocks[i].y);
            if (character.x < collideBlocks[i].x + collideBlocks[i].w &&
                character.x + character.w > collideBlocks[i].x &&
                character.y < collideBlocks[i].y + collideBlocks[i].h 
                &&
                character.y + character.h > collideBlocks[i].y) {
                    
                    character.y = collideBlocks[i].y - character.h;
                    character.vy = 0;                     
             } 
        }
    }
  }
