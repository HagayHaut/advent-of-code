file = File.open(__dir__ + '/input.txt')
lines = file.readlines.map(&:chomp)

elf_index = 0
calories_per_elf = {};

lines.each do |line|
    calories_per_elf[elf_index] ||= 0
    if line == ''
        elf_index += 1
        next
    end
    calories_per_elf[elf_index] += line.to_i
end

sorted_calory_sums = calories_per_elf.values.sort.reverse

p sorted_calory_sums.first
# 72602
p sorted_calory_sums[0...3].sum
# 207410
