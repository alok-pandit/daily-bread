package mycalculator

import (
	_ "golang.org/x/mobile/bind"
)

func Add(a, b int) int {
	return a + b
}

func Subtract(a, b int) int {
	return a - b
}
