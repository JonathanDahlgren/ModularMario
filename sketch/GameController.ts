class GameController {

    public sidebar = new Sidebar();
    public gameArea = new GameArea();
    public splashScreen = new SplashScreen(windowWidth, windowHeight, 0, 0);
    public inBuildPhase: boolean = false; //Activated when in building phase 
    public ladders: Array<LevelObject> = [];
    public logs: Array<LevelObject> = [];
    public stones: Array<LevelObject>= [];  
    private currentLevel: number = 0; //Keep track of currentLevel
    private levelFactory = new LevelFactory();
    private level: Level = this.levelFactory.getLevel(this.currentLevel); //Save array of level objects in level variable
    public laddersLeft: Array<LevelObject> = [];
    public logsLeft: Array<LevelObject> = [];
    public stonesLeft: Array<LevelObject> = [];
    private spawnPoint: {
      posX: number;
      posY: number;
      cellUnit: number;
    } = {
      posX: 0,
      posY: 0,
      cellUnit: 0
    };

  //Draw the gameArea
  public drawGameArea() {
    this.gameArea.draw();
  }

  //Loop list of level objects and draw them
  public drawLevel() {    

    for (let i = 0; i < this.level.levelObjects.length; i++) {
      this.level.levelObjects[i].draw();

      if (this.level.levelObjects[i].constructor === StartBlock) {
        this.spawnPoint = {
          posX: this.level.levelObjects[i].x,
          posY: this.level.levelObjects[i].y,
          cellUnit: this.level.levelObjects[i].w
        };
      }
      if (this.level.levelObjects[i].constructor === Block && player) {
        this.level.levelObjects[i].collide();
      }
      if (this.level.levelObjects[i].constructor === FinishBlock && player) {
        this.level.levelObjects[i].collide();
      }
    }
    return this.spawnPoint; //return the point where the character shall be placed
  }

  public spawnPlayer() {
    this.spawnPoint = this.drawLevel();
    player = new Character(
      this.spawnPoint.posX,
      this.spawnPoint.posY,
      this.spawnPoint.cellUnit
    );

    return player;
  }  
  
    //Loop list of level assets and draw them
    public drawAssets() {
        this.ladders = [];
        this.logs = [];
        this.stones = [];  
        this.laddersLeft = [];
        this.logsLeft = [];
        this.stonesLeft = [];

        //Divide Ladders Logs and Stones in to different arrays
        for(let i = 0; i < this.level.levelAssets.length; i++) {            
            switch (this.level.levelAssets[i].constructor) {
                case Ladder:
                    this.ladders.push(this.level.levelAssets[i]);
                    if (this.level.levelAssets[i].x < this.sidebar.w){
                        this.laddersLeft.push(this.level.levelAssets[i]);
                    }                                       
                    break;
                case Log:
                    this.logs.push(this.level.levelAssets[i]);
                    if (this.level.levelAssets[i].x < this.sidebar.w){
                        this.logsLeft.push(this.level.levelAssets[i]);
                    }                       
                    break;
                case Stone:
                    this.stones.push(this.level.levelAssets[i]);
                    if (this.level.levelAssets[i].x < this.sidebar.w){
                        this.stonesLeft.push(this.level.levelAssets[i]);
                    }
                    break;
            }  
            this.level.levelAssets[i].draw();           
        }
    }

    //Draw the Sidebar
    public drawSidebar() {  
        this.sidebar.draw(this.currentLevel, this.laddersLeft, this.logsLeft, this.stonesLeft);     
    }

    //Go into buildphase
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

    //When in buildphase, let builder class handle drawing of assets to gameArea
    public buildPhase(assetNumber: number) {
        if (this.inBuildPhase) {
            let builder = new Builder(this.inBuildPhase);      
            builder.inBuildMode(assetNumber, this.ladders, this.logs, this.stones);
            if (assetNumber === 4) {
              builder.resetLevel();
            }
        }
    }

    

}