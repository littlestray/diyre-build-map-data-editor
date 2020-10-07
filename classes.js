class OscObject {
    constructor(name = "cwix", x = 100, y = 100, size = 10, interval = 5000) {
      this.name = name;
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D();
      this.acceleration = createVector(0, 0);
      this.size = size;
      this.interval = interval; //number in frames
      this.life = 0;
      this.maxSpeed = 10;
  
      //OSC ADDRESS OBJECT
      this.address = {};
      this.address["x"] = "/" + this.name + "-x";
      this.address["y"] = "/" + this.name + "-y";
    }
  
    update() {
      this.life++;
    }
  
    behavior() { }
  
    draw(mode = "pro") {
      //drawing logic
      fill(Math.random() * 100 + 100, 120, Math.random() * 100 + 100);
      ellipse(this.position.x, this.position.y, this.size, this.size);
  
      //object debug text on top
      if (mode === "dev") {
        this.drawDebug();
      }
    }
  
    drawDebug() {
      fill(255);
      text(this.name, this.position.x, this.position.y);
    }
  
    sendOSC() {
      let msg = {
        address: this.address.x,
        args: [
          {
            type: "f",
            value: this.position.x / window.innerWidth,
          },
        ],
      };
      udpPort.send(msg);
  
      msg = {
        address: this.address.y,
        args: [
          {
            type: "f",
            value: this.position.y / window.innerHeight,
          },
        ],
      };
      udpPort.send(msg);
  
    }
  
    sendToSocket() {
      ipcRenderer.send("data", [
        "/" + this.name + "-x",
        this.position.x / window.innerWidth,
        "/" + this.name + "-y",
        this.position.y / window.innerHeight
      ]);
  
    }
  
    get getSocketObjData() {
      return [
        this.position.x / window.innerWidth,
        this.position.y / window.innerHeight
      ];
  
    }
  
    addForce(vector, mag) {
      this.velocity.add(this.acceleration.mult(mag));
    }
    //-------------------------------------------------------------------GETTERS
    get getPosition() {
      return this.position;
    }
  
    get getAddresses() {
      return [this.address.x, this.address.y];
    }
  }


class Turner extends OscObject {
    update(orbit) {
      super.update();
      //console.log(this.velocity);
      //console.log(this.acceleration);
  
      this.acceleration = createVector(
        window.innerWidth / (Math.random() * 2 + 1) - this.position.x,
        window.innerHeight / (Math.random() * 2 + 1) - this.position.y
      );
      //this.acceleration.limit(this.maxSpeed);
      if (orbit) {
        if (Math.random() > 0.9) {
          this.velocity.add(this.acceleration.mult(0.01));
          this.velocity.limit(this.maxSpeed);
          fill(255);
          ellipse(
            this.position.x + this.velocity.x,
            this.position.y + this.velocity.y,
            this.size * 2,
            this.size * 2
          );
        }
      } else {
        this.velocity.add(this.acceleration.mult(0.01));
        this.velocity.limit(this.maxSpeed);
        fill(255);
        ellipse(
          this.position.x + this.velocity.x,
          this.position.y + this.velocity.y,
          this.size * 2,
          this.size * 2
        );
      }
  
      this.position.add(this.velocity);
    }
  }
  exports.OscObject = OscObject;
  exports.Turner = Turner;