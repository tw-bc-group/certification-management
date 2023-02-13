module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'refactor', 'test', 'perf', 'docs', 'style', 'revert', 'config', 'chore'
    ]],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'scope-case': [0, 'never']
  }
}
