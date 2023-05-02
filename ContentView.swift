//
//  ContentView.swift
//  TestApp
//
//  Created by Kummetha NaveenKumarReddy on 25/04/23.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text("Hello, world!")
        }
        .padding()
    }
}


struct Workout: Identifiable {
    let id = UUID()
    let name: String
    let duration: Int
    let caloriesBurned: Int
    let image: String
}

struct WorkoutView: View {
    
    let workouts = [        Workout(name: "Running", duration: 30, caloriesBurned: 300, image: "running"),        Workout(name: "Cycling", duration: 45, caloriesBurned: 400, image: "cycling"),        Workout(name: "Yoga", duration: 60, caloriesBurned: 200, image: "yoga")    ]
    
    var body: some View {
        NavigationView {
            List(workouts) { workout in
                NavigationLink(destination: WorkoutDetail(workout: workout)) {
                    HStack {
                        Image(workout.image)
                            .resizable()
                            .frame(width: 50, height: 50)
                            .cornerRadius(25)
                        VStack(alignment: .leading) {
                            Text(workout.name)
                                .font(.headline)
                            Text("\(workout.duration) minutes")
                                .font(.subheadline)
                            Text("\(workout.caloriesBurned) calories burned")
                                .font(.subheadline)
                        }
                    }
                }
            }
            .navigationTitle("Workouts")
        }
    }
}

struct WorkoutDetail: View {
    
    let workout: Workout
    
    var body: some View {
        VStack {
            Image(workout.image)
                .resizable()
                .frame(width: 150, height: 150)
                .cornerRadius(75)
                .padding(.bottom, 20)
            Text(workout.name)
                .font(.title)
                .padding(.bottom, 5)
            Text("\(workout.duration) minutes")
                .font(.headline)
                .padding(.bottom, 5)
            Text("\(workout.caloriesBurned) calories burned")
                .font(.headline)
        }
        .navigationTitle(workout.name)
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        WorkoutView()
    }
}
