import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '1',
    title: 'Choose',
    description: 'Pick your treats from the menu and add them to your basket.',
  },
  {
    number: '2',
    title: 'Send on WhatsApp',
    description: 'Add your date, delivery details and any cake message, then send.',
  },
  {
    number: '3',
    title: 'Confirm & enjoy',
    description: 'We confirm details and payment, then bake it fresh for you.',
  },
];

function StepCard({ step, index }: { step: typeof steps[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48, rotateX: 12 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.15 }}
      whileHover={{
        y: -8,
        rotateZ: index % 2 === 0 ? -2 : 2,
        scale: 1.03,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      style={{ transformPerspective: 800, transformOrigin: 'bottom center' }}
      className="bg-[#3B1A0E] rounded-2xl p-8 flex flex-col items-center text-center gap-3 cursor-default will-change-transform"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: 'backOut', delay: index * 0.15 + 0.2 }}
        className="text-[#F5A623] font-serif font-bold text-6xl leading-none"
      >
        {step.number}
      </motion.span>
      <h3 className="text-white font-bold text-lg">{step.title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

export default function HowToOrderSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="font-serif text-[#3B1A0E] font-bold text-3xl sm:text-4xl text-center mb-10"
        >
          How to order
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
