// tests go here; this will not be compiled when this package is used as a library
// Initialise motor on pins 0, 1, 2, 3 (corresponding to IN1, IN2, IN3, IN4 of motor)
let motor = stepperMotor.createMotor(DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P3)

// Motor should rotate a half rotation anti-clockwise when button A is pressed
input.onButtonPressed(Button.A, function () {
    motor.moveAntiClockwise(0.5, stepUnit.Rotations);
})

// Motor should rotate a half rotation clockwise when button B is pressed
input.onButtonPressed(Button.B, function () {
    motor.moveClockwise(0.5, stepUnit.Rotations);
})
// Shake to slow down the stepper motor motion to 50ms per step
input.onGesture(Gesture.Shake, function () {
    motor.setDelay(50)
})
