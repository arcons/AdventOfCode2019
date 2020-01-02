import java.io.File

fun main (args: Array<String>) {
    println("Please enter a day for what you would like to run");
//    var day = readLine();
    var inputStrings = readFileAsLinesUsingUseLines("day10input.txt")
    var day10 = Day10(inputStrings);
    day10.performProcessing();
//    var running = when(day) {
//        "10" -> {
//            println("Running day 10")
//            // run day 10
//            var day10 = Day10(inputStrings);
//            day10.performProcessing();
//        }
//        else -> {
//            // change this to whatever day your debugging
//            var day10 = Day10(inputStrings);
//            day10.performProcessing();
//            println("No day found")
//        }
//
//    }
}

fun readFileAsLinesUsingUseLines(fileName: String): List<String>
        = File(fileName).useLines { it.toList() }