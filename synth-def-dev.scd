//---------------------------------------------------------SERVER INITIALIZATION
(
s.options.device ="Tea";
s.options.numOutputBusChannels = 2;
s.options.numInputBusChannels = 2;
)
//--------------------------------------------------------------------SYNTH DEFS
(
SynthDef(\bee, {arg freq = 440, detune = 1, out = 0, amp = 0.1, pan = 0, cutoff = 2000;
	var sig;
	sig = Saw.ar(
				MulAdd(
					freq,
					detune,
					0),
				amp,
				0
			);
	sig = LPF.ar(sig, cutoff);
	Out.ar(out,
		Pan2.ar(
			sig,
			pan,
			1));
}).add;

SynthDef(\reverb, {
	arg in, out = 0, delay = 1, delayAmt = 0.5;
	var sig;
	sig = In.ar(in,2);
	sig = DelayL.ar(sig, 4, delay, delayAmt, sig);
	sig = FreeVerb.ar(sig, 0.5, 0.8, 0.2);
	sig = HPF.ar(sig, 30,1);
	sig = HPF.ar(sig, 30,1);
	sig = Limiter.ar(sig, 0.99, 0.01);
	Out.ar(out, sig);
}).add;

)

//--------------------------------------------------------------GLOBAL VARIABLES

~detuneAmount = 0.002;
~detuneAmount = 0.02;
~detuneAmount = 0.2;
~detuneAmount = 02;


//-----------------------------------------------------------------DECLARE GROUP
(
~reverbBus = Bus.audio(s, 2);

~beeGrp = Group.new();

~detuneAmount = 0.002;
)
//--------------------------------------------------------------INSTANTIATE BEES
(
~beeList = Array.fill(8, {
	Synth.new("bee", [\freq, 220, \out, ~reverbBus], ~beeGrp);
});

~reverb = Synth.new(\reverb, [\in, ~reverbBus], ~beeGrp, \addAfter);

)

//-------------------------------------------------------------------SEQUENCING

(
Pdef(
	\fringe,
Pbind(
	\type, \set,
	\id, ~beeGrp.nodeID,
		// \midinote, Pxrand([41, 41, 41.02, 41.025, 45.1, 45.85, 56.77, 60.1, 64, 65, 69, 69.66, 70, 70.35, 76], inf).trace,
		\midinote, Pxrand([41,41.05, 41.1, 40.9, 40.95],inf).trace,
		// \dur, 0.05,
		\dur, Prand([0.5],inf).trace,
		\stretch, 60/30 * 4,
	\cutoff, 2000
);
).play

)

(
Pdef(
	\reverb,
Pbind(
	\type, \set,
	\id, ~reverb,
	\delay, Prand([1,2,4], inf),
	\delayAmt, 0.75,


		//DON'T TOUCH
	\dur, 4,
	\stretch, 60/30 * 4,
);
).play

)

/* NOTES I LIKE

69
46, 65, 69
45, 46, 65, 69, 70, 41
41, 45, 46, 57,6 0, 64, 65, 69, 70, 76

*/

//----------------------------------------------------------------OSC-LISTENERS

(

(
OSCdef('\Analog-0-x', {
	arg msg, time, addr, thing;
	//((msg[1] * 2)  - 1).postln();
	~beeList[0].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-0-x');
);
(
OSCdef('\Analog-0-y', {
	arg msg, time, addr, thing;
	//(((msg[1] * ~detuneAmount) + 1)).postln();
	~beeList[0].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-0-y');
);
(
OSCdef('\Analog-1-x', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[1].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-1-x');
);
(
OSCdef('\Analog-1-y', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[1].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-1-y');
);
(
OSCdef('\Analog-2-x', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[2].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-2-x');
);
(
OSCdef('\Analog-2-y', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[2].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-2-y');
);
(
OSCdef('\Analog-3-x', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[3].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-3-x');
);
(
OSCdef('\Analog-3-y', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[3].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-3-y');
);
(
OSCdef('\Analog-4-x', {
	arg msg, time, addr, thing;
	//((msg[1] * 2)  - 1).postln();
	~beeList[4].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-0-x');
);
(
OSCdef('\Analog-4-y', {
	arg msg, time, addr, thing;
	//(((msg[1] * ~detuneAmount) + 1)).postln();
	~beeList[4].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-0-y');
);
(
OSCdef('\Analog-5-x', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[5].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-1-x');
);
(
OSCdef('\Analog-5-y', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[5].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-1-y');
);
(
OSCdef('\Analog-6-x', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[6].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-2-x');
);
(
OSCdef('\Analog-6-y', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[6].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-2-y');
);
(
OSCdef('\Analog-7-x', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[7].set(\pan, (msg[1] * 2)  - 1);

}, '/Analog-3-x');
);
(
OSCdef('\Analog-7-y', {
	arg msg, time, addr, thing;
	//(msg - 0.5).postln()
	~beeList[7].set(\detune, (msg[1] * ~detuneAmount) + 1);

}, '/Analog-3-y');
);


);







OSCFunc.trace(false);