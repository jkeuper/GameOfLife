function GameOfLife(width, height) {
  this.width = width;
  this.height = height;
  this.grid = [];
}

GameOfLife.prototype.setCell = function(x, y) {
  this.grid[y*this.width + x] = 1;
};

GameOfLife.prototype.render = function(renderFunc) {
  var i;
  for (i=0; i<this.width*this.height; i++) {
    if (this.grid[i] == 1) {
      renderFunc(i%this.width, Math.floor(i/this.width));
    }
  }
};

GameOfLife.prototype.getAdjecentCount = function(i) {
  var result = 0;

  if (i % this.width > 0) // left
    result += this.grid[i-1] || 0;
  if (i % this.width < this.width-1) // right
    result += this.grid[i+1] || 0;
  if (i - this.width >= 0) // upper
    result += this.grid[i-this.width] || 0;
  if (i - this.width - 1 >= 0) // upper left
    result += this.grid[i-this.width-1] || 0;
  if (i - this.width + 1 >= 0) // upper right
    result += this.grid[i-this.width+1] || 0;
  if (i + this.width -1 < (this.width*this.height)-1) // lower left
    result += this.grid[i+this.width-1] || 0;
  if (i + this.width < (this.width*this.height)-1) // lower
    result += this.grid[i+this.width] || 0;
  if (i + this.width + 1 < (this.width*this.height)-1) // lower right
    result += this.grid[i+this.width+1] || 0;

  return result;
};

GameOfLife.prototype.nextStep = function() {
  var newGrid = [];
  var i;
  for (i=0; i<this.width*this.height; i++) {
    var adj = this.getAdjecentCount(i);
    if (this.grid[i] == 1) {
      if (adj >= 2 && adj < 4)
        newGrid[i] = 1;
    } else {
      if (adj == 3)
        newGrid[i] = 1;
    }
  }

  this.grid = newGrid;
};

