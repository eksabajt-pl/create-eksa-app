"use server";

let counter: number = 0;

export async function incrementCounterAction() {
  return ++counter;
}

export async function getCounterAction() {
  return counter;
}
