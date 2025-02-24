// --- fake data ---

import * as R from 'ramda'
import Chance from 'chance'

const chance = new Chance()

export const ideas = R.times(
  (i) => ({
    nick: `cool-idea-nick-${chance.hash({ length: 3 })}`,
    name: `Idea-${i + 1}: ` + chance.string({ length: 10, symbols: false, alpha: true }),
    description: chance.paragraph({ sentences: 1 }),
    text: chance.paragraph({ sentences: 10 }),
  }),
  100
)
