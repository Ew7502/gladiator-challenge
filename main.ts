function playStart () {
    Warning = 0
    challengeInProgress = true
    countdown = 3
    for (let index = 0; index < 3; index++) {
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showNumber(countdown)
        countdown += -1
        basic.pause(300)
    }
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    basic.clearScreen()
    level1()
    if (challengeInProgress == true) {
        level2()
    }
    if (challengeInProgress == true) {
        level3()
    }
    if (challengeInProgress == true) {
        level4()
    }
    if (challengeInProgress == true) {
        level5()
    }
    waitForStart()
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 17) {
        buttonPressedInTime = true
    } else if (receivedNumber == 84) {
        playStart()
    } else {
    	
    }
})
function level4 () {
    for (let index = 0; index < 8; index++) {
        if (challengeInProgress == false) {
            break;
        }
        buttonPressedInTime = false
        // 1120 x 5ms = 5.6s
        for (let index = 0; index < 1120; index++) {
            // 5ms
            basic.pause(5)
            if (input.buttonIsPressed(Button.A)) {
                buttonPressedInTime = true
            }
        }
        if (index == 7) {
            levelComplete = true
        }
        checkButtonPressedInTime()
    }
}
function checkButtonPressedInTime () {
    if (buttonPressedInTime) {
        if (levelComplete == true) {
            music.play(music.tonePlayable(622, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(740, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            Warning = 0
            levelComplete = false
        } else {
            music.play(music.tonePlayable(622, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
            Warning = 0
        }
    } else {
        music.play(music.tonePlayable(156, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
        Warning += 1
        basic.showNumber(Warning)
        basic.clearScreen()
        // break;
        if (Warning >= 3) {
            endGame()
        }
    }
}
function level1 () {
    for (let index = 0; index < 7; index++) {
        if (challengeInProgress == false) {
            break;
        }
        buttonPressedInTime = false
        // 1380 x 5ms = 6.9s
        for (let index = 0; index < 1380; index++) {
            // 5ms
            basic.pause(5)
            if (input.buttonIsPressed(Button.A)) {
                radio.sendNumber(17)
                buttonPressedInTime = true
            }
        }
        if (index == 6) {
            levelComplete = true
        }
        checkButtonPressedInTime()
    }
}
function endGame () {
    challengeInProgress = false
    for (let index = 0; index < 4; index++) {
        basic.clearScreen()
        basic.pause(500)
        music.play(music.tonePlayable(156, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.No)
    }
    waitForStart()
}
function level5 () {
    for (let index = 0; index < 4; index++) {
        if (challengeInProgress == false) {
            break;
        }
        buttonPressedInTime = false
        // 1100 x 5ms = 5.5s
        for (let index = 0; index < 1100; index++) {
            // 5ms
            basic.pause(5)
            if (input.buttonIsPressed(Button.A)) {
                buttonPressedInTime = true
            }
        }
        if (index == 3) {
            levelComplete = true
        }
    }
    checkButtonPressedInTime()
}
function waitForStart () {
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            radio.sendNumber(84)
            playStart()
            if (challengeInProgress == true) {
                break;
            }
        }
        basic.pause(5)
    }
}
function level3 () {
    for (let index = 0; index < 8; index++) {
        if (challengeInProgress == false) {
            break;
        }
        buttonPressedInTime = false
        // 1220 x 5ms = 6.1s
        for (let index = 0; index < 1280; index++) {
            // 5ms
            basic.pause(5)
            if (input.buttonIsPressed(Button.A)) {
                buttonPressedInTime = true
            }
        }
        if (index == 7) {
            levelComplete = true
        }
        checkButtonPressedInTime()
    }
}
function level2 () {
    for (let index = 0; index < 8; index++) {
        if (challengeInProgress == false) {
            break;
        }
        buttonPressedInTime = false
        // 1280 x 5ms = 6.4s
        for (let index = 0; index < 1280; index++) {
            // 5ms
            basic.pause(5)
            if (input.buttonIsPressed(Button.A)) {
                buttonPressedInTime = true
            }
        }
        if (index == 7) {
            levelComplete = true
        }
        checkButtonPressedInTime()
    }
}
let levelComplete = false
let buttonPressedInTime = false
let countdown = 0
let Warning = 0
let challengeInProgress = false
radio.setGroup(14)
radio.sendNumber(0)
challengeInProgress = false
Warning = 0
waitForStart()
