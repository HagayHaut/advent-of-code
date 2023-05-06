Dir.each_child(__dir__) do |year|
    if ['2020', '2021', '2022'].include? year
        Dir.each_child("#{__dir__}/#{year}") do |day|
            cur_dir = "#{__dir__}/#{year}/#{day}"
            Dir.each_child(cur_dir) do |filename|
                if filename != 'input.txt'
                    ext = filename.split('.')[1]
                    File.rename("#{cur_dir}/#{filename}", "#{cur_dir}/script.#{ext}")
                end
            end
        end
    end
end
