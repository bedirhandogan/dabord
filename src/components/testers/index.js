import abs from '@/components/testers/functions/abs.vue'
import acos from '@/components/testers/functions/acos.vue'
import asin from '@/components/testers/functions/asin.vue'
import atan from '@/components/testers/functions/atan.vue'
import atan2 from '@/components/testers/functions/atan2.vue'
import attr from '@/components/testers/functions/attr.vue'
import calc from '@/components/testers/functions/calc.vue'
import clamp from '@/components/testers/functions/clamp.vue'

const testers = {
    functions: {
        'abs()': abs,
        'acos()': acos,
        'asin()': asin,
        'atan()': atan,
        'atan2()': atan2,
        'attr()': attr,
        'calc()': calc,
        'clamp()': clamp
    },
    properties: {},
    selectors: {}
}

export default testers
