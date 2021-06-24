# Rails Startup Checklist

- check `Gemfile` for `gem 'web-console', '>= 4.1.0'` so that we can use `<% console %>` in `html.erb` files
- check machine has installed `vim` so that we can edit the encrypted environment based API keys using `EDITOR=vim bin/rails credentials:edit`. see [this tutorial](https://blog.engineyard.com/rails-encrypted-credentials-on-rails-5.2) for full details. or see `app/controllers/application_controller.rb`
- setup custom logging as seen in `app/controllers/application_controller.rb`
- check `Gemfile` for `gem 'byebug'` so we can debug in server
- check `Gemfile` for `gem 'solargraph'` so we can have ruby vscode tooling
- check `Gemfile` for `gem 'rubocop'` so we can have enforced styling
- check `Gemfile` for `gem 'prettier'` for auto styling. You'll also have to install via npm `npm install --save-dev prettier @prettier/plugin-ruby` as well as for javascript `npm install --save-dev prettier eslint prettier-eslint` and then restart the VSCode editor.
- check `.rubocop_todo.yml` and `.prettierrc.json` for syncronized styling. in VSCode, check `settings.json` for the below config:

```json
{
  // If not specified searches for 'rubocop' executable available on PATH (default and recommended)
  "ruby.rubocop.executePath": "",

  // You can use specific path
  // "ruby.rubocop.executePath": "/Users/you/.rbenv/shims/"
  // "ruby.rubocop.executePath": "/Users/you/.rvm/gems/ruby-2.3.2/bin/"
  // "ruby.rubocop.executePath": "D:/bin/Ruby22-x64/bin/"

  // If not specified, it assumes a null value by default.
  // "ruby.rubocop.configFilePath": ".rubocop.yml",

  // default true
  "ruby.rubocop.onSave": true,
  // prettier
  "[ruby]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  // ignore dependencies on remote watch
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true
  },

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

## Access via Remote Machine

### SSH
Run the command:
```sh
ssh -i <PATH_TO_SSH_PRIVATE_KEY> <USERNAME>@<IP_ADDRESS>
```
This same command can be used to remote connect VSCode

### Browser
Run rails with open ingress from anywhere, and port set to 80 instead of 3000 (since most default VPC will allow port 80, thus we dont need to configure extra settings)
```sh
rails s --binding=0.0.0.0 -p 80
```


## Testing

- disable csrf while running tests by adding below code to `/config/environments/test.rb`
```
# Disable request forgery protection in test environment
config.action_controller.allow_forgery_protection    = false
```

- rails model tests [tutorial](https://semaphoreci.com/community/tutorials/how-to-test-rails-models-with-minitest)


## Cheatsheet

- [Concise Rails Cheat Sheet](https://dev.to/ericchapman/my-beloved-ruby-on-rails-cheat-sheet-50pi)
- [Explanatory Rails Cheat Sheet](https://gist.github.com/mdang/95b4f54cadf12e7e0415)

## Best Practices

- [6 Ruby Best Practices](https://www.codementor.io/ruby-on-rails/tutorial/6-ruby-best-practices-beginners-should-know)
- [9 Best Practices for Rails](https://dzone.com/articles/9-best-practices-to-follow-while-coding-in-rails-1)


## API Only Rails

Add middleware using:
```rb
config.middleware.use Rack::MethodOverride
```

See [full docs](https://guides.rubyonrails.org/api_app.html)