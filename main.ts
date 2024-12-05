function playStart () {
    Warning = 0
    countdown = 3
    for (let index = 0; index < 3; index++) {
        music.play(music.tonePlayable(587, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showNumber(countdown)
        countdown += -1
        basic.pause(300)
    }
    music.play(music.tonePlayable(880, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    basic.clearScreen()
    challengeInProgress = true
    lastShuttleComplete = control.millis()
    shuttleCompleteCount = 0
    shuttleTime = lvl1ShuttleTime
}
function shuttleComplete () {
    lastShuttleComplete = control.millis()
    shuttleCompleteCount += 1
    shuttleTime = lvl1ShuttleTime
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 17) {
        buttonPressedInTime = true
    } else if (receivedNumber == 84) {
        playStart()
    }
})
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
function endGame () {
    challengeInProgress = false
    for (let index = 0; index < 4; index++) {
        basic.clearScreen()
        basic.pause(500)
        music.play(music.tonePlayable(156, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.No)
    }
}
input.onButtonPressed(Button.A, function () {
    if (challengeInProgress == true) {
        radio.sendNumber(17)
        buttonPressedInTime = true
    } else {
        radio.sendNumber(84)
        playStart()
    }
})
let levelComplete = false
let buttonPressedInTime = false
let shuttleTime = 0
let shuttleCompleteCount = 0
let lastShuttleComplete = 0
let countdown = 0
let Warning = 0
let lvl1ShuttleTime = 0
let challengeInProgress = false
radio.setGroup(14)
radio.sendNumber(0)
challengeInProgress = false
lvl1ShuttleTime = 6.9
let lvl2ShuttleTime = 6.4
let lvl3ShuttleTime = 6
control.inBackground(function () {
	
})
loops.everyInterval(100, function () {
    if (challengeInProgress == true) {
        if (control.millis() - lastShuttleComplete > shuttleTime * 1000) {
            checkButtonPressedInTime()
            buttonPressedInTime = false
            shuttleComplete()
        }
    }
})
