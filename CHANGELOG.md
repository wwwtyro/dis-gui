# 2.0.9

- Support top-level className prop

# 2.0.8

- Use `prop-types` instead of deprecated `React.PropTypes`

# 2.0.7

- Folders provide subscription function via context, children may register for updates on expand/collapse
- Fix initial layout issue of `number-range` nested in folder via subscription 

# 2.0.6

- Defer initial layouting after mount `number-range` (workaround for invalid initial thumb position before first update)

# 2.0.5

- Use PureComponent

# 2.0.4

- Implement missing componentWillReceiveProps -> state updates

# 2.0.2

- Drop deprecated `react-addons-update`, use `immutability-helper` instead

# 2.0.2

- add prepublish script to build - forgot to build 2.0.1 last time :)

# 2.0.1

- change extensions to .js

# 2.0.0

- change name to @loopmode/dis-gui
- move source code into /src
- transpile into /lib
- publish /lib
- transpile with babel
