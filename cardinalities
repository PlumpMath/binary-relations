type
  TBinaryRelation = array of array of boolean;
  TCardinalitiesDistribution = array [0..7] of cardinal;

const                      //flags
  reflexivity  : byte = 1; //00000001
  antisymmetry : byte = 2; //00000010
  transitivity : byte = 4; //00000100

var
  n : byte;
  id : cardinal;
  binaryRelation : TBinaryRelation;
  properties : byte;
  cardinalitiesDistribution : TCardinalitiesDistribution;

function power(base, exponent : cardinal) : cardinal;
begin
  if (exponent = 1)
  then power := base
  else power := base * power(base, exponent - 1);
end;

function getBinaryRelation(id : cardinal) : TBinaryRelation;
var
  i, j : byte;
begin
  SetLength(getBinaryRelation, n, n);
  for i := 0 to n-1 do begin
    for j := 0 to n-1 do begin
      getBinaryRelation[i, j] := (id mod 2 = 1);
      id := id div 2;
    end;
  end;
end;

function isReflexive(br : TBinaryRelation) : boolean;
var i : byte;
begin
  for i := 0 to n-1 do begin
    if (not br[i,i])
    then begin isReflexive := false; exit; end;
  end;
  isReflexive := true;
end;

function isAntisymmetric(br : TBinaryRelation) : boolean;
var i, j : byte;
begin
  for i := 1 to n-1 do begin
    for j := 0 to i-1 do begin
      if (br[i, j] and br[j, i])
      then begin isAntisymmetric := false; exit; end;
    end;
  end;
  isAntisymmetric := true;
end;

function isTransitive(br : TBinaryRelation) : boolean;
var i, j, k : byte;
begin
  for i := 0 to n-1 do begin
    for j := 0 to n-1 do begin
      if (not br[i, j])
      then for k := 0 to n-1 do begin
        if (br[i, k] and br[k, j])
        then begin isTransitive := false; exit; end;
      end;
    end;
  end;
  isTransitive := true;
end;

function getProperties(br : TBinaryRelation) : byte;
var properties : byte = 0;
begin
  if (isReflexive(br))
    then properties := properties or reflexivity;
  if (isAntisymmetric(br))
    then properties := properties or antisymmetry;
  if (isTransitive(br))
    then properties := properties or transitivity;
  getProperties := properties;
end;

procedure printBinaryRelation(br : TBinaryRelation);
var i, j : byte;
begin
  for i := 0 to n-1 do begin
    for j := 0 to n-1 do begin
      Write(ord(br[i, j]));
    end;
    WriteLn();
  end;
  WriteLn();
end;

procedure printDistribution(arr : TCardinalitiesDistribution);
var element: cardinal;
begin
  for element in arr do begin
    Write(element, ' ');
  end;
  WriteLn();
end;

begin
  Write('n = '); ReadLn(n);
  //loop through all binary relations of given order n
  for id := 0 to power(2, n * n) - 1 do begin
    binaryrelation := getBinaryRelation(id);
    properties := getProperties(binaryrelation);
    inc(cardinalitiesDistribution[properties]);
  end;
  printDistribution(cardinalitiesDistribution);
  ReadLn();
end.
