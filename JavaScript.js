

function start() {
    car1 = new car();
    controller = new controllerTrafficLight();
    controller.createManyTraffic();
    car1.setControllerTraffic(controller);
    car1.startMove() 

}

function car(speed = 10) {
    this.width = 25;
    this.present = createElement(undefined, undefined, 50, 50, undefined, undefined, undefined, undefined, this.width);
    this.speed = speed;
    this.setControllerTraffic = function (controller) {
        this.currentController = controller;

        
    }

    this.isMove = false;

    this.startMove = function () {
        if (this.currentController != null && !this.isMove) {
            this.isMove = true;
            this.interval = setInterval(this.move, 1000 / this.speed, this)
            this.intervalCapabilities = setInterval(this.checkСapabilitiesEz, 1000 / this.speed, this)
        } else {
            alert("Need set controller or car move now");
        }
    }
    this.countTrafficLight = 0;

    this.move = async function (context = this) {
        if (context.countTrafficLight + 1 > context.currentController.countTrafficLight) {
            alert("finish");
            clearInterval(context.interval)

        } else if (context.interval != undefined && context.isMove) {
           
            styleTrafficLight = context.currentController.allTraff[context.countTrafficLight].present.style;
            styleCar = context.present.style;
            if (styleTrafficLight.backgroundColor == "green"
                && getPx(styleCar.left) <= getPx(styleTrafficLight.left) - getPx(styleTrafficLight.width) - context.width - 5) {
                styleCar.left = getPx(styleCar.left) + 5;

            } else if (getPx(styleCar.left) <= getPx(styleTrafficLight.left) - getPx(styleTrafficLight.width) - context.width - 5) {
                styleCar.left = getPx(styleCar.left) + 5;
            } else if (getPx(styleCar.left) > getPx(styleTrafficLight.left) - getPx(styleTrafficLight.width) - context.width - 5
                && styleTrafficLight.backgroundColor == "green") {
                    context.countTrafficLight++;
            }


        }
        else {
            alert("Need start move or bebebe");
        }
    }


    this.checkСapabilitiesEz = async function (context = this, baseWave = 2) {
        canMove = true;
        for (var i = context.countTrafficLight; i < context.currentController.countTrafficLight; i++) {
            trafficLight = context.currentController.allTraff[i]
            if (baseWave != 0) {

                if (trafficLight.present.style.backgroundColor == "green" && canMove) {
                    canMove = true;
                } else {
                    canMove = false;
                }
                baseWave--;
            } else {
                break;
            }




        }
        if(canMove) {
            context.present.style.backgroundColor = "green";
        } else {
            context.present.style.backgroundColor = "red";
        }
    }


    this.checkСapabilities = async function (context = this, baseWave = 2) {
        canMove = true;
        for (var i = context.countTrafficLight; i < context.currentController.countTrafficLight; i++) {
            trafficLight = context.currentController.allTraff[i]
            if (baseWave != 0) {

                timeCapability = Date.now();

                S = getPx(trafficLight.present.style.left) - getPx(context.present.style.left);

                timeToS = S / 5 * 1000 ;

                timeCapability = timeCapability + timeToS - trafficLight.createMs;
                countDiv = Math.floor(timeCapability / (trafficLight.cooldown * 100000));
         


                if (countDiv % 2 == 1 && canMove && countDiv != 0) {
                    canMove = true;
                } else {
                    canMove = false;
                }
                baseWave--;
            } else {
                break;
            }
        }
        if (canMove) {
            context.present.style.backgroundColor = "green";
        } else {
            context.present.style.backgroundColor = "red";
        }


    }

     
     
     
    
    
}

function getPx(string) {
    return Number(string.substr(0, string.length - 2))
}



function createControllerAndStartGenerate() {
    let controller = new controllerTrafficLight;
    controller.createManyTraffic();
    return controller;

}


function controllerTrafficLight() {

    this.countTrafficLight = 0;

    this.allTraff = [];



    this.createManyTraffic = function (count = 10) {
        for (let i = 0; i != count; i++) {
            this.allTraff.push(new trafficLight(this.countTrafficLight + this.countTrafficLight * 15 + 10));
            this.countTrafficLight++;
            currentTrafficChangeButton = new trafficChangeButton(1, this.allTraff[i]);
            currentTrafficChangeButton.present.onclick = currentTrafficChangeButton.changeColor;
        }
        
    }

    return this;
}

function trafficLight(factor = 1, place = "traffic") {


    this.present = createElement(undefined, undefined, undefined, undefined, factor, undefined, undefined, place);

    this.createMs = Date.now();
   

    this.cooldown = Math.random();

    this.changeColor = function(p=this.present) {
        if (p.style.backgroundColor == "red") {
            p.style.backgroundColor = "green";
        } else {
            p.style.backgroundColor = "red";
        };
    };
    

    this.interval = setInterval(this.changeColor, this.cooldown * 100000, this.present)

    return this;
}

function trafficChangeButton(factor = 1, owner) {


    this.owner = owner;

    this.present = createElement("button", getPx(owner.present.style.left), 20, 30, factor, undefined, "gray", undefined, getPx(owner.present.style.top) + getPx(owner.present.style.height) + 20);

    this.changeColor = function () {
        owner.changeColor();
    }
    return this;
}

function createElement(element = "div", left = 30, height = 100, width = 30, factor = 1, position = "absolute", backgroundColor = "red", place = "traffic", top = 0) {

    element = document.createElement(element);
    element.style.width = width;

    element.style.height = height;

    element.style.left = left * factor;

    element.style.position = position;
    element.style.top = top;
    element.style.backgroundColor = backgroundColor;

    document.getElementById(place).appendChild(element);
    return element;

}

