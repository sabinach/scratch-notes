export const polar_layout = function() {
    var delta_theta, rho, self, theta, theta_0;

    rho = function(d, i, data) {
      return 100;
    };
  
    theta_0 = function(d, i, data) {
      return -Math.PI / 2;
    };
  
    delta_theta = function(d, i, data) {
      return 2 * Math.PI / data.length;
    };
  
    theta = function(d, i, data) {
      return theta_0(d, i, data) + i * delta_theta(d, i, data);
    };
  
    self = function(data) {
      data.forEach(function(d, i) {
        d.rho = rho(d, i, data);
        d.theta = theta(d, i, data);
        d.x = d.rho * Math.cos(d.theta);
        d.y = d.rho * Math.sin(d.theta);
      });
      return data;
    };
  
    self.rho = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          rho = x;
        } else {
          rho = function() {
            return x;
          };
        }
        return self;
      }
      return rho;
    };
  
    self.theta_0 = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          theta_0 = x;
        } else {
          theta_0 = function() {
            return x;
          };
        }
        return self;
      }
      return theta_0;
    };
  
    self.delta_theta = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          delta_theta = x;
        } else {
          delta_theta = function() {
            return x;
          };
        }
        return self;
      }
      return delta_theta;
    };
  
    self.theta = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          theta = x;
        } else {
          theta = function() {
            return x;
          };
        }
        return self;
      }
      return theta;
    };
  
    return self;
  
  };