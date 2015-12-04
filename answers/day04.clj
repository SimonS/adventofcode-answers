;; copypaste from https://gist.github.com/jizhang/4325757
(import 'java.security.MessageDigest
        'java.math.BigInteger)

(defn md5 [s]
  (let [algorithm (MessageDigest/getInstance "MD5")
        size (* 2 (.getDigestLength algorithm))
        raw (.digest algorithm (.getBytes s))
        sig (.toString (BigInteger. 1 raw) 16)
        padding (apply str (repeat (- size (count sig)) "0"))]
    (str padding sig)))

(def is-advent-coin? #(-> (md5 %)
                          (subs 0 5)
                          (= "00000")))

(defn find-advent-coin [k]
  (subs (first
          (filter is-advent-coin?
                  (map #(str k %)
                       (iterate inc 100000))))
        (count k)))
