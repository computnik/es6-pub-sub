class Subscribers extends Set {
  constructor () {
    super.apply(this, arguments);
  }

  add (subscriber) {
    typeof subscriber === "function" ? super.add(subscriber) : false;
  }

  run () {
    this.forEach((subscriber) => setTimeout(subscriber));
  }

  runSync () {
    this.forEach((subscriber) => subscriber());
  }
}

class TopicsMap extends Map {
  constructor () {
    super();
    super.set(null, new Subscribers());
  }

  notifySubscribers (topic, aSync) {
    aSync ? this.get(topic).run() : this.get(topic).runSync();
  }

  removeSubscriber (topic, subscriber) {
    let list = super.get(topic);
    list.remove(subscriber);
    if (list.size === 0) {
      super.delete(topic);
    }
  }

  assureTopic (topic) {
    if (!super.has(topic)) {
      super.set(topic, new Subscribers());
    }
    return super.get(topic);
  }

  addSubscriber (topic, subscriber) {
    this.assureTopic(topic).add(subscriber);
  }
}

class PubSub {
  constructor () {
    const Topics = new TopicsMap();
    const ALL_TOPICS = null;
    this.getTopics = () => Array.from(Topics.keys());
    this.subscribe = (topic = ALL_TOPICS, subscriber) => Topics.addSubscriber(topic, subscriber);
    this.publish = (topic = ALL_TOPICS, aSync = true) => Topics.has(topic) ? Topics.notifySubscribers(topic, aSync) : false;
    this.unsubscribe = (topic, subscriber) => Topics.removeSubscriber(topic, subscriber);
  }
}