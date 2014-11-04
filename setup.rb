#!/usr/bin/env ruby

print "Enter your codd username: \n"
username = gets.chomp

puts "Creating sync.rb file with username #{username}\n"


file_contents = '#!/usr/bin/env ruby \n'
file_contents += '\`cd app && scp -r ./'' ' + username + '@codd.cs.gsu.edu:~/public_html/project_2\`'

`echo "#{file_contents}" > sync.rb && chmod 755 sync.rb`

puts "Done! To sync the app directory, enter \"./sync.rb\" into the terminal.\n"
