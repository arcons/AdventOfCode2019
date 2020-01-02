import kotlin.math.absoluteValue
import kotlin.math.max

class Day10(val input: List<String>) {
    fun performProcessing() {
        // create a list of all asteroids
        val asteroidSet = mutableSetOf<kotlin.Pair<kotlin.Int, kotlin.Int>>();
        input.forEachIndexed {index, it ->
            var astroidIndexes = it.toCharArray().mapIndexed{index, it -> if (it == '#') index else it};
            astroidIndexes.forEachIndexed { asteroidX, asteroid ->
                if(!asteroid.equals('.')) {
                    val asterPosition = Pair(asteroidX, index)
                    asteroidSet.add(asterPosition);
                }
            }
        }
        val asteroidAngles = createVectorMap(asteroidSet);
        killAstroids(asteroidAngles, asteroidSet);
//        println(asteroidSet.toList());
    };
    //
    // create a map of asteroid with it's value being a set
    // and it's vector of each asteroid around it with
    // check if any of the vectors are divisible with any other value in the set
    // loop through at the end and save the largest number
    fun createVectorMap (asteroids: Set<Pair<Int, Int>>): Map<Pair<Int, Int>, MutableSet<Double>> {
        // create map from set and get the vectors between points
        val asteroidVectorMap = mutableMapOf<Pair<Int, Int>, MutableSet<Double>>();
        asteroids.forEach{
            val testPosition = it;
            asteroids.forEach{
                // check that theyre not the same a line
//                if((testPosition.first != it.first) && (testPosition.second != it.second)) {
                    // if not the same position then get the x and y between the points
                if(it != testPosition) {
                    var magX = testPosition.first - it.first;
                    var magY = testPosition.second - it.second;
                    var slope = Math.toDegrees(Math.atan2(magY.toDouble(), magX.toDouble()));
                    // change the negatives to positives
                    if(slope < 0) {
                        slope+=360;
                    }
                    if (asteroidVectorMap.containsKey(it)) {
                        asteroidVectorMap[it]?.add(slope);
                    } else {
                        asteroidVectorMap.put(it, mutableSetOf(slope))
                    }
                    // have magnitude store it and add it to a set
//                } else {
//                    // handle points in a line
//                    var magX = it.first-testPosition.first;
//                    var magY = it.second-testPosition.second;
//                    // if magX is 0 then it's directly above
//                    if(magX == 0) {
//                        // set the slope to basically 0 and multiply it by it's direct - for below + for above v
//                        // y axis
//                        val slope = if(magY <= 0) 0.01 else -0.01;
//                        if(asteroidVectorMap.containsKey(it)) {
//                            asteroidVectorMap[it]?.add(slope);
//                        } else {
//                            asteroidVectorMap.put(it, mutableSetOf(slope))
//                        }
//                    } else if (magY == 0) {
//                        // x axis
//                        val slope = if(magX <= 0) Double.MAX_VALUE else Double.MIN_VALUE;
//                        if(asteroidVectorMap.containsKey(it)) {
//                            asteroidVectorMap[it]?.add(slope);
//                        } else {
//                            asteroidVectorMap.put(it, mutableSetOf(slope))
//                        }
//                    }
//                }
                }
            }
        }
        var maxCount = 0;
        var bestPair = Pair<Int, Int>(0, 0);
        asteroidVectorMap.keys.forEach{
            var setSize = asteroidVectorMap[it]?.size ?: 0;
            if(setSize > maxCount) {
                maxCount = setSize;
                bestPair = it;
            }
        }

        // Part A
//        println(bestPair);
//        println(maxCount);

        return asteroidVectorMap;
    }

    fun killAstroids (asteroidAngles: Map<Pair<Int, Int>, Set<Double>>, allAsteroids: MutableSet<Pair<Int, Int>>) {
        var numberOfAsteroids = allAsteroids.size;
        // 22, 19 is the starting point from part A
        val laserRay = Pair(22,19);
        // sorted list of the angles
        println(asteroidAngles[laserRay]?.sorted());
//        println(allAsteroids);
    }

}