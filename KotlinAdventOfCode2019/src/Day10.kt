import kotlin.math.absoluteValue
import kotlin.math.max

class Day10(val input: List<String>) {
    fun performProcessing() {
        // create a list of all asteroids
        val asteroidSet = mutableSetOf<kotlin.Pair<kotlin.Int, kotlin.Int>>();
        input.forEachIndexed {index, it ->  
            var astroidIndexes = it.toCharArray().mapIndexed{index, it -> if (it == '#') index else it};
            astroidIndexes.forEachIndexed { asteroidX: Char, asteroid: Char ->
                if(!asteroid.equals('.')) {
                    val asterPosition = Pair(asteroidX, index)
                    asteroidSet.add(asterPosition);
                }
            }
        }
        val asteroidData = createVectorMap(asteroidSet);
        val asteroidAngles = asteroidData.first;
        val spaceBlasterAngles = asteroidData.second;
        killAstroids(spaceBlasterAngles, asteroidSet);
//        println(asteroidSet.toList());
    };
    //
    // create a map of asteroid with it's value being a set
    // and it's vector of each asteroid around it with
    // check if any of the vectors are divisible with any other value in the set
    // loop through at the end and save the largest number
    fun createVectorMap (asteroids: Set<Pair<Int, Int>>): Pair<Map<Pair<Int, Int>, MutableSet<Double>>, Map<Double, MutableList<Pair<Int, Int>>>> {
        // create map from set and get the vectors between points
        val asteroidVectorMap = mutableMapOf<Pair<Int, Int>, MutableSet<Double>>();
        var asteroidAngleMap = mutableMapOf<Double, MutableList<Pair<Int, Int>>>()
        asteroids.forEach{
            val testPosition = it;
            asteroids.forEach{
                // check that theyre not the same a line
                if(it != testPosition) {
//                    var magX = testPosition.first - it.first;
//                    var magY = testPosition.second - it.second;
                    val slope = getAngle(testPosition, it)
                    if (asteroidVectorMap.containsKey(it)) {
                        asteroidVectorMap[it]?.add(slope);
                        // only do this for the position 22,19 since thats the station
                        if(testPosition == Pair(22,19)) {
                            if(asteroidAngleMap.containsKey(slope)) {
                                asteroidAngleMap[slope]?.add(it);
                            } else {
                                asteroidAngleMap.put(slope, mutableListOf<Pair<Int, Int>>(it))
                            }
                        }
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
        println(bestPair);
        println(maxCount);

        return Pair(asteroidVectorMap, asteroidAngleMap);
    }

    fun killAstroids (asteroidAngles: Map<Double, MutableList<Pair<Int, Int>>>, allAsteroids: MutableSet<Pair<Int, Int>>) {
        var numberOfAsteroids = 282//allAsteroids.size;
        // 22, 19 is the starting point from part A 282 is the number of asteroids in the line of sight
        // sorted list of the angles
        val angleList = asteroidAngles.keys?.sorted();
        // rotate by 90 clockwise for proper quadrants
        val firstQuadrant = angleList.filter{ it >= (90.0) && it <= 180};
        var restOfCircle = angleList.filter { !firstQuadrant.contains(it) };
        var lastAsteroid = Pair(1000, 1000)
        while (numberOfAsteroids >= 82) {
            // this will descend from 90
            firstQuadrant.forEach{
                if(numberOfAsteroids == 82) {
                    print("End me fam ")
                    println(numberOfAsteroids)
                    println(lastAsteroid);
                    return
                };
                if(asteroidAngles.containsKey(it)) {
                    val numAtAngle = asteroidAngles[it]?.size ?: 0;
                    if(numAtAngle > 0) {
                        lastAsteroid = asteroidAngles[it]?.removeAt(numAtAngle-1) ?: Pair(1000, 1000);
                        print(lastAsteroid)
                        print (" at ");
                        print(it);
                        println(" has been destroyed")
                        numberOfAsteroids--;
                    }
                }
            }
            restOfCircle.forEach{
                if(numberOfAsteroids == 82)
                {
                    print("End me fam ")
                    println(numberOfAsteroids)
                    println(lastAsteroid);
                    return
                };
                if(asteroidAngles.containsKey(it)) {
                    val numAtAngle = asteroidAngles[it]?.size ?: 0;
                    if(numAtAngle > 0) {
                        lastAsteroid = asteroidAngles[it]?.removeAt(numAtAngle-1) ?: Pair(1000, 1000);
                        print(lastAsteroid)
                        print (" at ");
                        print(it);
                        println(" has been destroyed")
                        numberOfAsteroids--;
                    }
                }
            }
        }
//        println(asteroidAngles);
        // this contains the angles and positions of all the asteroids needing to be blown up
        // asteroid angle map contains furthest to closest, pop the last item off
//        println(angleList);
//        println(allAsteroids);
    }
//
    fun getAngle (testPosition: Pair<Int,Int>, it:Pair<Int, Int>) : Double {
        var magX = testPosition.first - it.first;
        var magY = testPosition.second - it.second;
        return Math.toDegrees(Math.atan2(magY.toDouble(), magX.toDouble()));
    }

}