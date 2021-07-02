'use babel';

import AtomicNotedownView from './atomic-notedown-view';
import { CompositeDisposable } from 'atom';

export default {

  atomicNotedownView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomicNodedownView = new AtomicNotedownView(state.atomicNotedownViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomicNotedownView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atomic-notedown:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomicNodedownView.destroy();
  },

  serialize() {
    return {
      atomicNodedownViewState: this.atomicNodedownView.serialize()
    };
  },

  toggle() {
    console.log('AtomicNodedown was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
