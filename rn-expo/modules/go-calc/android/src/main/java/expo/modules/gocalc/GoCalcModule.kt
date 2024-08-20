package expo.modules.gocalc

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import mycalculator.Mycalculator

class GoCalcModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('GoCalc')` in JavaScript.
    Name("GoCalc")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange", "onSub")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
       var sum = Mycalculator.add(1, 2)

      "The result of 1 + 2 is $sum"
    }

    Function("sub") { num1: Long, num2: Long ->
       var sub = Mycalculator.subtract(num1, num2)

        sub
    }
    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    AsyncFunction("subAsync") { num1: Long, num2: Long ->
      // Send an event to JavaScript.
      val result = Mycalculator.subtract(num1, num2)

      // Send the result to JavaScript
      sendEvent("onSub", mapOf(
          "sub-result" to result
      ))
    }
    
    
    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(GoCalcView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: GoCalcView, prop: String ->
        println(prop)
      }
    }
  }
}
