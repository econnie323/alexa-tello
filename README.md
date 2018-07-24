# alexa-tello
Interacting with the DJI/Ryze Tello using only the voice. The drone works with Amazon's Alexa voice assistant to respond to voice-prompted commands.


![Preview](https://github.com/econnie323/alexa-tello/blob/master/Cover.jpg)

Speak your verbal commands to Amazon Echo to control your drone. First, Alexa Skills Kit parses voice commands, then Node-RED send commands to RPi over MQTT. Finally, node.js RPi will send the specific command to drone over Tello Wifi Network.

## More details

This code is based on the Tello SDK documentation. To simplify the vocal interaction, each movement was fixed at 1 meter, the rotation at 90 degrees and the flip only forward.

You can find more details at https://hackster.io
