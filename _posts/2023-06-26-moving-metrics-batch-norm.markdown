---
layout: post
title:  "Moving metrics in Batch Normalization"
date:   2023-06-26 00:00:00 -0700
categories: deep learning
---

## Introduction
A loose definition of moving metrics is calculating metrics on the fly. Recently I wrote my own version of Autograd and a neural network library called [centigrad](https://github.com/dinesh-GDK/centigrad), similar to PyTorch and that is where I wandered to this topic.


## The thought
If you have used PyTorch to build a neural network, you would have noticed that before training the model you will use this call `model.train()` and `model.eval()` for evaluating the model or preparing the model for production. Ever wondered why we use them? There are quite a few of them, but for the sake of this article, we will stick to Batch Normalization layers. This equation gives us the operation of batch normalization

$$ y = {x - μ \over \sqrt{σ^2}} * γ + β $$

Where $x$ is a single sample from the batch, $μ$ is the mean of the batch and $σ^2$ is the variance of the batch. $γ$ and $β$ are the scale and shift learnable parameters respectively.


During training, we calculate the mean and variance of the entire batch and do the calculations. Also during this phase, we keep track of moving mean and moving variance across the batches. Why? Because we use these moving metrics during the evaluation phase. Why? Because when using the model in production or during evaluation we typically do not have the same batch size(sometimes we just use a single input).


Also, the moving metrics are calculated on the training dataset, which captures the general trend.


## Calculation
Now we know the necessity of the moving metrics, let us get into the implementation. Let’s start with a simple solution. To get the moving mean and moving variance, we store the elements in an array and finally calculate the mean and variance of the array. Yes, you are right it is a horrible solution. Why? The solution is **linear space complexity**. Given the large batch sizes and size of the vectors, we would need ginormous storage to get the moving mean and moving variance.


Say we need to train a Convolutional Neural Network(CNN) with 100 batch normalization layers with a total of 1000 batches, with images of size 256x256x3. Also, the vectors in the intermediate layers could have varying dimensions with hundreds of channels. Imagine the space required to calculate the moving metrics. And this is a simple CNN. Imagine the space required for the models like GPT where we have numerous layers with billions of parameters.


## Let's do math
So how do we overcome this problem? Math! Well, Math with a simple trick. Let us assume that we need to compute the mean for $n$ batches

$$ μ_n = {X_1 + X_2 + X_3 + ... + X_{n-2} + X_{n-1} + X_n \over n} $$

Where $X_i$ is a sample from $i^{th}$ batch. We assume that we know the mean for $n-1$ batches

$$ μ_{n-1} = {X_1 + X_2 + X_3 + ... + X_{n-3} + X_{n-2} + X_{n-1} \over {n-1}} $$

Altering the above equation

$$ (n - 1) * μ_{n-1} = X_1 + X_2 + X_3 + ... + X_{n-3} + X_{n-2} + X_{n-1} $$

Substituting this equation in the first one, we get

$$ μ_n = {(n - 1) * μ_{n-1} + X_n \over n} $$

The rest of the steps are just rearranging the terms until we get a good form

$$ μ_n = {n * μ_{n-1} - μ_{n-1} + X_n \over n} $$

$$ μ_n = {n * μ_{n-1} \over n} + {X_n- μ_{n-1}  \over n} $$

$$ μ_n = μ_{n-1} + {X_n- μ_{n-1}  \over n} $$

With this equation, we just need to know the current sample, the current sample size, and the previous mean to calculate the running mean. We can do something similar to calculate the moving variance as well. With this, we have reduced our **space complexity to constant**. A simple but elegant trick has given us a beautiful solution.


## Conclusion
Moving metrics are used in a lot of applications. Especially in real-time applications. For example, a version of this is used to create a *moving average filter*, which is used to reduce noise in signal in real-time. It is amazing how the frameworks we use on a daily basis have amazing things like these. I found this quite interesting so wanted to share it with you guys.
