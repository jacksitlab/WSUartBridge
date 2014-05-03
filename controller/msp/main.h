/*
 * main.h
 *
 *  Created on: 29.04.2014
 *      Author: jack
 */

#ifndef MAIN_H_
#define MAIN_H_


#include <msp430.h>

#define LED_B_PIN BIT3
#define LED_G_PIN BIT2
#define LED_R_PIN BIT4
#define LED_ALL_PINS (LED_R_PIN+LED_G_PIN+LED_B_PIN)
#define LED_R_OFF P1OUT |= LED_R_PIN
#define LED_G_OFF P1OUT |= LED_G_PIN
#define LED_B_OFF P1OUT |= LED_B_PIN
#define LED_R_ON P1OUT &= ~LED_R_PIN
#define LED_G_ON P1OUT &= ~LED_G_PIN
#define LED_B_ON P1OUT &= ~LED_B_PIN
#define LED_R_TOGGLE P1OUT ^= LED_R_PIN
#define LED_G_TOGGLE P1OUT ^= LED_G_PIN
#define LED_B_TOGGLE P1OUT ^= LED_B_PIN
#define LED_ALL_OFF P1OUT|=LED_ALL_PINS
#define LED_ALL_ON P1OUT&=~LED_ALL_PINS

#endif /* MAIN_H_ */
