# Compiler and flags
CXX = g++
CXXFLAGS = -Wall

# Target executable name
TARGET = main

# Default rule to compile the program
all: $(TARGET)

# Rule to create the executable
$(TARGET): main.cc
	$(CXX) $(CXXFLAGS) -o $(TARGET) main.cc

# Rule to remove the executable
clean:
	rm -f $(TARGET)

# Phony target to avoid conflicts with a file named 'clean'
.PHONY: clean