export Temperature, Celsius, Kelvin
import Base: +, -, *, convert, promote_rule

abstract Temperature

immutable Celsius <: Temperature
    value::Float64
end

immutable Kelvin <: Temperature
    value::Float64
end

# Handle conversion and promotion of temperature
convert(::Type{Kelvin}, celsius::Celsius) = Kelvin(celsius.value + 273.15)
convert(::Type{Celsius}, kelvin::Kelvin) = Celsius(kelvin.value - 273.15)
promote_rule(::Type{Kelvin}, ::Type{Celsius}) = Kelvin

Kelvin(celsius::Celsius) = convert(Kelvin, celsius)
Celsius(kelvin::Kelvin) = convert(Celsius, kelvin)

+(x::Temperature, y::Temperature) = +(promote(x,y)...)
-(x::Temperature, y::Temperature) = -(promote(x,y)...)

+(x::Celsius, y::Celsius) = Celsius(x.value + y.value)
-(x::Celsius, y::Celsius) = Celsius(x.value - y.value)
+(x::Kelvin, y::Kelvin) = Kelvin(x.value + y.value)
-(x::Kelvin, y::Kelvin) = Kelvin(x.value - y.value)
