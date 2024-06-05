#include <iostream>
using namespace std;

const int ROWS = 3;
const int COLS = 4;

int findMax(int arr[][COLS], int row, int col) {
    if (row == ROWS) {
        return INT_MIN; 
    }

    int current = arr[row][col];
    int nextCol = (col + 1) % COLS;
    int nextRow = (nextCol == 0) ? row + 1 : row;

    int maxInRest = findMax(arr, nextRow, nextCol);
    return max(current, maxInRest);
}

int main() {
    int arr[ROWS][COLS] = {
        {5, 12, 8, 3},
        {9, 4, 7, 1},
        {6, 11, 2, 10}
    };

    int maxValue = findMax(arr, 0, 0);
    cout << maxValue << endl;

    system("pause");
    return 0;
}