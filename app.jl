function CreateBinaryRelationFromItsIndex(binary_relation_index)
  for i = 1:n^2
    br[i] = convert(Bool, binary_relation_index & 1)
    binary_relation_index >>>= 1
  end
  return br
end

function isReflexive(br)
  for i = 1:n
    br[i,i] || return false
  end
  return true
end

function isTransitive(br)
  for i = 1:n, j = 1:n
    br[i,j] && continue
    for k = 1:n
      br[i,k] && br[k,j] && return false
    end
  end
return true
end

function isAntisymm(br)
  for i = 1:n, j = 2:i-1
    br[i,j] && br[j,i] && return false
  end
  return true
end

# maybe immutable/mutable type should be created for binary relations?
const n = 3
const reflexivity  = 0x01
const antisymmetry = 0x02
const transitivity = 0x04
br = trues(n,n)
powers = zeros(8) # how to preset it's type?
# iteration through all binary relations of given rank n:
for binary_relation_index = 0:2^n^2
  binary_relation = CreateBinaryRelationFromItsIndex(binary_relation_index)
  # at this poit binary relation is represented as a boolean matrix
  properties = 0x00 # clear flags
  isReflexive (binary_relation) && properties |= reflexivity
  isAntisymm  (binary_relation) && properties |= antisymmetry
  isTransitive(binary_relation) && properties |= transitivity
  powers[properties+1] += 1 # increase the power of the class with given properties
end
