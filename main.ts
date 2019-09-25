/*
    /* Made from pxt-ucl-junkrobot and Learning Developments tutorial on stepper motors
    /* https://github.com/chevyng/pxt-ucl-junkrobot/blob/master/main.ts
    /* https://learningdevelopments.co.nz/blogs/lessons/stepper-motor-control-with-the-micro-bit
    /*
    /* And much help from Sparkfun's tutorial on building extensions in MakeCode
    /* https://learn.sparkfun.com/tutorials/how-to-create-a-makecode-package-for-microbit/all
    /* Much love from Tinkercademy
*/

enum stepUnit {
    //% block="steps"
    Steps,
    //% block="rotations"
    Rotations
}

//% color=#1f49bf icon="\uf013"
namespace stepperMotor {

    export class Motor {

        private input1: DigitalPin;
        private input2: DigitalPin;
        private input3: DigitalPin;
        private input4: DigitalPin;
        private delay: number;
        private state: number;

        setPins(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): void {
            // send pulse
            this.input1 = in1;
            this.input2 = in2;
            this.input3 = in3;
            this.input4 = in4;
        }

        setState(stateNum: number): void {
            this.state = stateNum;
        }

        //% blockId=set_motor_calibration block="%motor|set delay between steps to %delayNum|ms"
        //% weight=60 blockGap=8
        setDelay(delayNum: number): void {
            this.delay = delayNum;
        }

        /* Functions for running a stepper motor by steps */

        steps(direction: number): void {
            if (this.state == 0) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 1) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 2) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 0);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 1);
            } else if (this.state == 3) {
                pins.digitalWritePin(this.input1, 0);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 1);
                pins.digitalWritePin(this.input4, 0);
            } else if (this.state == 4) {
                pins.digitalWritePin(this.input1, 1);
                pins.digitalWritePin(this.input2, 1);
                pins.digitalWritePin(this.input3, 0);
                pins.digitalWritePin(this.input4, 0);
            }

            this.state = this.state + direction;
            if (this.state < 1) {
                this.state = 4;
            } else if (this.state > 4) {
                this.state = 1;
            }

        }

        //% blockId=moveAntiClockwise block="move %motor| %steps|%unit| anti-clockwise"
        //% weight=85 blockGap=8
        moveAntiClockwise(steps: number, unit: stepUnit): void {

            switch (unit) {
                case stepUnit.Rotations: steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnit.Steps: steps = steps;
            }

            for (let i = 0; i < steps; i++) {
                this.steps(1);
                basic.pause(this.delay);
            }

            this.state = 0;
        }

        //% blockId=moveClockwise block="move %motor| %steps|%unit| clockwise"
        //% weight=84 blockGap=8
        moveClockwise(steps: number, unit: stepUnit): void {

            switch (unit) {
                case stepUnit.Rotations: steps = steps * 2056; //2056 steps = approximately 1 round
                case stepUnit.Steps: steps = steps;
            }

            for (let i = 0; i < steps; i++) {
                this.steps(-1);
                basic.pause(this.delay);
            }

            this.state = 0;
        }

        //% blockId=stopMotor block="stop %motor"
        //% weight=70 blockGap=8
        stopMotor(): void {
            this.state = 0;
        }


    }

    /**
     * Create a new stepper motor with connected pins at @param.
     * @param 4 pins where the motor is connected.
     */
    //% blockId="stepperMotor_setMotor" block="motor at in1 %in1|in2 %in2|in3 %in3|in4 %in4"
    //% weight=90 blockGap=8
    //% parts="motor"
    //% blockSetVariable=motor
    export function createMotor(in1: DigitalPin, in2: DigitalPin, in3: DigitalPin, in4: DigitalPin): Motor {
        let motor = new Motor();
        motor.setPins(in1, in2, in3, in4);
        motor.setState(0);
        motor.setDelay(1);
        return motor;
    }

}