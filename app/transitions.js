import { target, onOpenTether } from 'liquid-tether';

export default function() {
  this.transition(
    target('enable-repo'),
    onOpenTether(),
    this.use('tether', ['fade-up', {
      duration: 400,
      easing: [600, 22]
    }]),
    this.reverse('tether', ['fade-down', {
      duration: 400,
      easing: 'easeOut'
    }])
  );
}
