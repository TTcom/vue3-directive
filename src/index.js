import { registerDirective } from './utils/directive.js'

const install = (app) => {
  registerDirective(app)
}
export { install as default }
