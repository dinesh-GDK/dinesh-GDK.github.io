---
layout: post
title:  "Two Symbol Turing Machine"
date:   2021-04-21 00:00:00 -0700
categories: deep learning
---

## Introduction
A Turing machine is a mathematical model used for computation by using infinitely long tape with symbols and a set of instructions. It was proposed by Alan Turing (remember, The Imitation Game) in 1936.

All the programming languages are Turing complete and all the computer hardware (well almost) are Turing complete, meaning that they can do everything that a Turing machine can do. A two symbol Turing machine is a Turing machine that uses only two symbols (eg. 0’s and 1’s) for computation.

Well!, let's get straight to the point and see what’s a two symbol Turing machine.

## The Components
A Turing machine has three components
 - Infinitely long tape
 - Read/write head
 - Set of instructions

The Turing machine uses infinite tape, to read and write symbols using the head on the tape by following a set of instructions.

## How does it work?
Let us see the working of our Turing machine through an example of unary addition.

Unary addition is simple stroke addition, say we add three strokes with two strokes we get five strokes

```
||| + || = |||||
```
So, let's assume that our Turing machine uses two symbols 0 and 1.

The initial tape is given below, where * represents the read/write head of the machine.

```
      * 
0 0 0 1 1 1 0 1 1 0 0 0 
```
The instructions are in three cards.

<table>
    <tr>
        <th colspan=4>CARD-1</th>
    </tr>
    <tr>
        <th>SYMBOL</th>
        <th>WRITE</th>
        <th>SHIFT</th>
        <th>NEXT</th>
    </tr>
    <tr>
        <td>0</td>
        <td>1</td>
        <td>R</td>
        <td>2</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>R</td>
        <td>1</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan=4>CARD-1</th>
    </tr>
    <tr>
        <th>SYMBOL</th>
        <th>WRITE</th>
        <th>SHIFT</th>
        <th>NEXT</th>
    </tr>
    <tr>
        <td>0</td>
        <td>0</td>
        <td>L</td>
        <td>3</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1</td>
        <td>R</td>
        <td>2</td>
    </tr>
</table>

<table>
    <tr>
        <th colspan=4>CARD-1</th>
    </tr>
    <tr>
        <th>SYMBOL</th>
        <th>WRITE</th>
        <th>SHIFT</th>
        <th>NEXT</th>
    </tr>
    <tr>
        <td>0</td>
        <td>0</td>
        <td>R</td>
        <td>0</td>
    </tr>
    <tr>
        <td>1</td>
        <td>0</td>
        <td>R</td>
        <td>0</td>
    </tr>
</table>

1. The machine works as follows,
2. The machine begins with an initial card
3. The head reads the symbol on the tape
4. The head erases and writes the new symbol on the tape according to the symbol read
5. The head shifts in the direction (left or right) according to the symbol read
6. The machine follows the next cards according to the symbol read
7. The machine repeats the steps 2 to 5 until the halt card (CARD -0)

## Walk Through
Our machine starts initially with CARD -1, with the initial tape.
```
INITIAL STATE
      * 
0 0 0 1 1 1 0 1 1 0 0 0
```
The head encounters symbol 1, so it writes 1 shift to the right and follows the instructions from the next card, CARD -1 itself. The same happens two more times.
```
STEP 1
        * 
0 0 0 1 1 1 0 1 1 0 0 0

STEP 2
          * 
0 0 0 1 1 1 0 1 1 0 0 0

STEP 3
            * 
0 0 0 1 1 1 0 1 1 0 0 0
```
At STEP 3 the machine stills follow CARD -1. The head reads the symbol 0, now the head erases 0 and writes 1, shifts to the right, and goes to CARD -2 for the next instructions. Then, the head reads 1, writes 1, and shifts to the right. This repeats again for another step.

```
STEP 4
              * 
0 0 0 1 1 1 1 1 1 0 0 0

STEP 5
                * 
0 0 0 1 1 1 1 1 1 0 0 0

STEP 6
                  * 
0 0 0 1 1 1 1 1 1 0 0 0

```

Now, the head reads symbol 0, following the instructions from CARD -2, it writes 0, shifts left and gets the next instructions from CARD-3.

```
STEP 7
                * 
0 0 0 1 1 1 1 1 1 0 0 0
```

Now, the head reads symbol 1, it erases and writes 0, shift to the right, and the next card is CARD -0 (HALT)

## Conclusion
In this article, we had a brief discussion on what is a Turing machine, especially a two symbol Turing machine. We went through the working of two symbols Turing machine through an example of unary addition.

I have implemented the two-state Turing machine in C and you can access through this [link](https://github.com/dinesh-GDK/turing_machine).

You can create your own Turing machine with the flexibility of adding custom instructions and tape, with step-by-step visualization. I have added some interesting tapes and cards for you to implement.

We have just touched the tip of the iceberg. There are very interesting puzzles which we can play with the Turing machine. One such puzzle is the Busy Beaver problem, a truly fascinating one. If interested just take a peek at it. The GitHub link contains some busy beaver cards and tapes as well.