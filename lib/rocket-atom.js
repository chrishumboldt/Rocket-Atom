'use babel';

import RocketAtomView from './rocket-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  rocketAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rocketAtomView = new RocketAtomView(state.rocketAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rocketAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rocket-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rocketAtomView.destroy();
  },

  serialize() {
    return {
      rocketAtomViewState: this.rocketAtomView.serialize()
    };
  },

  toggle() {
    console.log('RocketAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
