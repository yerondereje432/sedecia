import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import './StatsSection.css';

const STATS = [
  { value: 20, suffix: '+', label: 'nav.home', key: 'solutions', icon: '🚀', desc: 'Solutions Delivered' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="stats section" ref={ref}>
      <div className="container">
        <div className="stats__grid">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              className="stats__card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="stats__icon">{stat.icon}</div>
              <div className="stats__number">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals || 0}
                    delay={i * 0.1}
                  />
                )}
                <span className="stats__suffix">{stat.suffix}</span>
              </div>
              <div className="stats__label">{stat.desc}</div>
              <div className="stats__bar">
                <motion.div
                  className="stats__bar-fill"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
