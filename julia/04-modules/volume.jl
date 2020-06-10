#!/usr/bin/env julia

module Volume
export sphere_volume, cylinder_volume # make this functions public

"Volume of sphere with radius ``r`"
sphere_volume(r) = (4/3) * pi * r^3

"Volume of cylinder with radius `r` and height `h`"
cylinder_volume(r, h) = circle_area(r) * h

"Surface area of a. cylinder of height `h` and radius `r`"
cylinder_area(r, h) = 2*circle_area(r) + 2*pi*r*h

"Area of a triangle"
triangle_area(b, h) = b * h / 2

"Area of a circle with radius `r`"
circle_area(r) = pi * r^2

"Area of rectangle with height `h` and width `w`"
rectangle_area(h, w) = h * w

end
