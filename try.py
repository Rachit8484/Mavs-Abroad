# Rachit Agarwal
# 1001664316

# Jacobi method
# u1 = lambda a, b, c, p, q, r: (5-r+2*b)/6
# u2 = lambda a, b, c, p, q, r: (3+2*a+2*c-q)/6
# u3 = lambda a, b, c, p, q, r: (1+b+p)/3
# u4 = lambda a, b, c, p, q, r: (1+c+q)/3
# u5 = lambda a, b, c, p, q, r: (3-b+2*p+2*r)/6
# u6 = lambda a, b, c, p, q, r: (5-a+2*q)/6
# a0 = 0
# b0 = 0
# c0 = 0
# p0 = 0
# q0 = 0
# r0 = 0
# count = 100
# TOL = float(input('Enter Error Tolerance: '))
# print('\nCount\ta\tb\tc\tp\tq\tr\n')
# condition = True
# while condition:
#     a1 = u1(a0, b0, c0, p0, q0, r0)
#     b1 = u2(a0, b0, c0, p0, q0, r0)
#     c1 = u3(a0, b0, c0, p0, q0, r0)
#     p1 = u4(a0, b0, c0, p0, q0, r0)
#     q1 = u5(a0, b0, c0, p0, q0, r0)
#     r1 = u6(a0, b0, c0, p0, q0, r0)
#     print('%d\t%0.4f\t%0.4f\t%0.4f\t%0.4f\t%0.4f\t%0.4f\n' %(count, a1, b1, c1, p1, q1, r1))
#     TOL1 = abs(a0 - a1)
#     TOL2 = abs(b0 - b1)
#     TOL3 = abs(c0 - c1)
#     TOL4 = abs(p0 - p1)
#     TOL5 = abs(q0 - q1)
#     TOL6 = abs(r0 - r1)

#     count += 1
#     a0 = a1
#     b0 = b1
#     c0 = c1
#     p0 = p1
#     q0 = q1
#     r0 = r1
 
#     condition = TOL1>TOL and TOL2>TOL and TOL3>TOL and TOL4>TOL and TOL5>TOL and TOL6>TOL
# print('\nSolution: a=%0.3f, b=%0.3f, c=%0.3f, p=%0.3f, q=%0.3f, r = %0.3f \n'% (a1, b1, c1, p1, q1, r1))

# # Gauss seidal
# u1 = lambda a, b, c, p, q, r: (5-r+2*b)/6
# u2 = lambda a, b, c, p, q, r: (3+2*a+2*c-q)/6
# u3 = lambda a, b, c, p, q, r: (1+b+p)/3
# u4 = lambda a, b, c, p, q, r: (1+c+q)/3
# u5 = lambda a, b, c, p, q, r: (3-b+2*p+2*r)/6
# u6 = lambda a, b, c, p, q, r: (5-a+2*q)/6
# a0 = 0
# b0 = 0
# c0 = 0
# p0 = 0
# q0 = 0
# r0 = 0
# count = 100
# TOL =float(input('Enter error tolerance: '))
# print('\nCount\ta\tb\tc\tp\tq\tr\n')
# condition = True
# while condition:
#     a1 = u1(a0, b0, c0, p0, q0, r0)
#     b1 = u2(a1, b0, c0, p0, q0, r0)
#     c1 = u3(a1, b1, c0, p0, q0, r0)
#     p1 = u4(a1, b1, c1, p0, q0, r0)
#     q1 = u5(a1, b1, c1, p1, q0, r0)
#     r1 = u6(a1, b1, c1, p1, q1, r0)
#     print('%d\t%0.4f\t%0.4f\t%0.4f\t%0.4f\t%0.4f\t%0.4f\n' %(count, a1, b1, c1, p1, q1, r1))
#     TOL1 = abs(a0-a1)
#     TOL2 = abs(b0-b1)
#     TOL3 = abs(c0-c1)
#     TOL4 = abs(p0-p1)
#     TOL5 = abs(q0-q1)
#     TOL6 = abs(r0-r1)

#     count += 1
#     a0 = a1
#     b0 = b1
#     c0 = c1
#     p0 = p1
#     q0 = q1
#     r0 = r1

#     condition = TOL1>TOL and TOL2>TOL and TOL3>TOL and TOL4>TOL and TOL5>TOL and TOL6>TOL
# print('\nSolution: a = %0.3f, b = %0.3f, c = %0.3f, p = %0.3f, q = %0.3f, r = %0.3f\n'% (a1, b1, c1, p1, q1, r1))


# # Successive over-relaxation (SOR)
u1 = lambda a, b, c, p, q, r: (5-r+2*b)/6
u2 = lambda a, b, c, p, q, r: (3+2*a+2*c-q)/6
u3 = lambda a, b, c, p, q, r: (1+b+p)/3
u4 = lambda a, b, c, p, q, r: (1+c+q)/3
u5 = lambda a, b, c, p, q, r: (3-b+2*p+2*r)/6
u6 = lambda a, b, c, p, q, r: (5-a+2*q)/6
a0 = 0
b0 = 0
c0 = 0
p0 = 0
q0 = 0
r0 = 0
count = 100
TOL = float(input('Enter error tolerance: '))
w = float(input("Enter omega value: "))
print('\nCount\ta\tb\tc\tp\tq\tr\n')
condition = True
while condition:
 a1 = (1-w) * a0 + w * u1(a0, b0, c0, p0, q0, r0)
 b1 = (1-w) * b0 + w * u2(a1, b0, c0, p0, q0, r0)
 c1 = (1-w) * c0 + w * u3(a1, b1, c0, p0, q0, r0)
 p1 = (1-w) * p0 + w * u4(a1, b1, c1, p0, q0, r0)
 q1 = (1-w) * q0 + w * u3(a1, b1, c1, p0, q0, r0)
 r1 = (1-w) * r0 + w * u3(a1, b1, c1, p1, q0, r0)
 print('%d\t%0.4f\t%0.4f\t%0.4f\t%0.4f\t%0.4f\t%0.4f\n' %(count, a1, b1, c1, p1, q1, r1))
 TOL1 = abs(a0-a1)
 TOL2 = abs(b0-b1)
 TOL3 = abs(c0-c1)
 TOL4 = abs(p0-p1)
 TOL5 = abs(q0-q1)
 TOL6 = abs(r0-r1)

 count += 1
 a0 = a1
 b0 = b1
 c0 = c1
 p0 = p1
 q0 = q1
 r0 = r1

 condition = TOL1>TOL and TOL2>TOL and TOL3>TOL and TOL4>TOL and TOL5>TOL and TOL6>TOL
print('\nSolution: a = %0.3f, b = %0.3f, c = %0.3f, p = %0.3f, q = %0.3f, r = %0.3f\n'% (a1, b1, c1, p1, q1, r1))
