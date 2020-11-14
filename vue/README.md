# Scattered Notes

Directive, no curly braces needed, need quotes, inside tags, bind to attribute 

{{ add() }}
{{ name }}

<a v-bind:href=“website”>XXX</a>
<p v-html=“websiteTag”></p>

V-on:click=“age++”, click events
V-on:click=“add”
V-on:dblclick=“add”
V-on:mousemove=“updateXY”
V-on:keyup=“logName”
V-model=“name” (two-way data binding)

Event modifiers
V-on:click.once 
V-on:click.prevent 
V-on:keyup.alt.enter

Dynamic Classes
<div v-bind:class=“{red: false, blue: true}”></div>
	=> <div class=“red”></div>
<div v-bind:class=“{available: available}”>
	<span>Text</span>
</div>
V-on:click=“available=!available”


Span{
	background: red;
}
.available span{
	background: green;
}

id: #canvas
Can style and use as app

{{ addToA() }}
{{ addToB }}

El:
Data:
Methods:
	this.age
	addToA: function(){}
Computed:
	addToB: function(){}
	computedClasses: function(){
		return {
			available: this.available,
			nearby: this.nearby  
		}
	}

<p>v-if=“boolean”>There has been an error</p>
V-else
V-else-if <— removes it completely from DOM
V-show  <— gives display: none in DOM
<li>v-for=“(character, index) in characters”>{{ index }}. {{ character.name }} - {{ character.age }}</li>

<template v-for=“”></template>
	vs. div/span
v-for=“(val, key) in ninja” —> cycle through objects
